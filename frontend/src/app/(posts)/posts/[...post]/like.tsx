'use client';

import { HeartIcon as On } from '@heroicons/react/24/solid';
import { HeartIcon as Off } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { LoginIni } from '@/type/user/type';
import { api } from '@/util/api';
import { PostType } from '@/type/community/type';

export default function Like(data: PostType) {
  {
    /** ssr 좋아요 반영을 위한 초깃값 설정 */
  }
  const [like, setLike] = useState({ click: false, length: data.likes.length });

  {
    /** 로그인한 유저의 좋아요 확인*/
  }
  const loginUser: LoginIni = useAppSelector(state => state.loginSlice);
  const checkLikeWithUser = data.likes.find(user => user === loginUser.id);

  const handleLike = () => {
    if (!loginUser.id) return alert('로그인이 필요합니다.');
    else {
      api.post(`/post/likes`, { id: loginUser.id, postNumber: data.postNumber });
      setLike(prev => ({ ...prev, click: !prev }));
    }
  };

  useEffect(() => {
    if (checkLikeWithUser) setLike(prev => ({ ...prev, click: true }));
  }, [loginUser]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center gap-2 border border-b-0 p-default">
        <span>{data.likes.length}</span>
        {like.click ? (
          <On width={32} height={32} color="red" onClick={handleLike} />
        ) : (
          <Off width={32} height={32} onClick={handleLike} />
        )}
      </div>
      <div className="flex border">
        <span className="p-default">공유하기</span>
        <span className="p-default border-l">신고</span>
      </div>
    </div>
  );
}
