'use client';

import { HeartIcon as On } from '@heroicons/react/24/solid';
import { HeartIcon as Off } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { LoginIni } from '@/type/user/type';
import { api } from '@/util/api';
import { PostType } from '@/type/community/type';

export default function Like(data: PostType) {
  const [userId, setUserId] = useState('');
  // ssr 좋아요 반영을 위한 초깃값 설정
  const [like, setLike] = useState({ click: false, length: data.likes.length });

  const handleLike = () => {
    if (!userId) return alert('로그인이 필요합니다.');

    api.post(`/post/likes`, { id: userId, postNumber: data.postNumber });
    setLike(prev => {
      // 좋아요 상태에 따라 좋아요 수 조정
      const newLength = prev.click ? prev.length - 1 : prev.length + 1;
      return { length: newLength, click: !prev.click };
    });
  };

  useEffect(() => {
    //  로그인한 유저 확인
    const savedData = window.localStorage.getItem('user');
    const loginUser: LoginIni = savedData !== null && JSON.parse(savedData);
    if (loginUser.id) setUserId(prev => loginUser.id);

    // 좋아요 확인
    const checkLikeWithUser = data.likes.find(user => user === loginUser.id);
    if (checkLikeWithUser) setLike(prev => ({ ...prev, click: true }));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center gap-2 border border-b-0 p-default">
        <span>{like.length}</span>
        <button type="button" onClick={handleLike}>
          {like.click ? <On width={32} height={32} color="red" /> : <Off width={32} height={32} />}
        </button>
      </div>
      <div className="flex border">
        <span className="p-default">공유하기</span>
        <span className="p-default border-l">신고</span>
      </div>
    </div>
  );
}
