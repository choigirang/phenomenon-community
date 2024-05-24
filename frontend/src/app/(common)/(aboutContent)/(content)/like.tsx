'use client';

import { useEffect, useState } from 'react';
import { api } from '@/util/api';

import { LoginIni } from '@/type/user/type';
import { PostType } from '@/type/community/type';
import { GalleryType } from '@/type/gallery/type';

import { HeartIcon as Off } from '@heroicons/react/24/outline';
import { HeartIcon as On } from '@heroicons/react/24/solid';

// type guard - post or gallery
function isPostType(data: PostType | GalleryType): data is PostType {
  return (data as PostType) !== undefined;
}

/** 2024/05/15 - post or gallery like */
export default function Like(data: PostType | GalleryType) {
  // user id for api
  const [userId, setUserId] = useState('');
  // set init likes data for mutate(ssr)
  const [like, setLike] = useState({ click: false, length: data.likes.length });

  // like func
  const handleLike = () => {
    if (!userId) return alert('로그인이 필요합니다.');

    // post or gallery with api
    if (isPostType(data)) {
      api.post(`/post/likes`, { id: userId, postNumber: data.postNumber });
      setLike(prev => {
        // set like state for mutate(ssr)
        const newLength = prev.click ? prev.length - 1 : prev.length + 1;
        return { length: newLength, click: !prev.click };
      });
    } else {
      api.post('/gallery/likes', { id: userId, galleryNumber: data.galleryNumber });
      setLike(prev => {
        // set like state for mutate(ssr)
        const newLength = prev.click ? prev.length - 1 : prev.length + 1;
        return { length: newLength, click: !prev.click };
      });
    }
  };

  // share handler copy url
  const shareHandler = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    alert('URL이 복사되었습니다!');
  };

  useEffect(() => {
    // check login user
    const savedData = window.localStorage.getItem('user');
    const loginUser: LoginIni = savedData !== null && JSON.parse(savedData);
    if (loginUser.id) setUserId(prev => loginUser.id);

    // compare post likes list with login user
    const checkLikeWithUser = data.likes.find(user => user === loginUser.id);
    if (checkLikeWithUser) setLike(prev => ({ ...prev, click: true }));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center gap-2 border border-b-0 p-default">
        <span>{like.length}</span>
        <button type="button" onClick={handleLike} name="like btn">
          {like.click ? <On width={32} height={32} color="red" /> : <Off width={32} height={32} />}
        </button>
      </div>
      <button type="button" className="flex border p-default" onClick={shareHandler}>
        공유하기
      </button>
    </div>
  );
}
