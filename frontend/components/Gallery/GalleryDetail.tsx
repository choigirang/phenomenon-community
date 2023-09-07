import useGalleryDetail from '@/hooks/gallery/useGalleryDetail';
import { loginSuccess } from '@/redux/actions/user';
import { RootState } from '@/redux/store';
import { GalleryType } from '@/types/type';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function GalleryDetail({ id }: { id: number }) {
  const [likes, setLikes] = useState<boolean>();
  // 갤러리 데이터 받아오기
  const queryResult = useGalleryDetail(id);
  // 로그인 상태 확인 (댓글 기능)
  const user = useSelector((state: RootState) => state.user.user);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.galleryLikes) {
      const checkLike = user.galleryLikes.filter(like => like.galleryNumber === id);
      setLikes(checkLike.length > 0);
    } else {
      setLikes(false); // user가 없을 때 likes를 false로 설정
    }
  }, [user, id]);

  if (queryResult.isLoading) {
    return <div>Loading...</div>;
  }

  if (queryResult.isError) {
    const error = queryResult.error as Error;
    return <div>Error: {error.message}</div>;
  }

  if (!queryResult.data) {
    return <div>No data available</div>;
  }

  // 게시글 데이터
  const data: GalleryType = queryResult.data;

  // 좋아요
  const likesHadnler = () => {
    api.post('post/likes', { id: user.id, galleryNumber: id }).then(res => {
      dispatch(loginSuccess(res.data));
    });
  };

  // 글 삭제
  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    api.delete(`/gallery/${data.galleryNumber}`).then(res => {
      alert('게시글이 삭제되었습니다.');
      router.push('/');
    });
  };

  return <div>GalleryDetail</div>;
}
