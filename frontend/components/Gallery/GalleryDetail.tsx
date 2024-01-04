import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/redux/store';

import { api } from '@/util/api';
import { GalleryType } from '@/types/type';
import { loginSuccess } from '@/redux/actions/user';
import { GALLERY_URL } from '@/constant/constant';
import useGalleryDetail from '@/hooks/gallery/useGalleryDetail';
import AddComment from '../Community/AddComment';
import EachComment from '../Community/EachComment';

import styled from 'styled-components';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

/**
 * @param id 갤러리 게시글 클릭 시 받아올 갤러리 번호
 * home || gallery/index 에서 클릭한 갤러리 번호를 넘겨받아 데이터 요청
 */
export default function GalleryDetail({ id }: { id: number }) {
  // 좋아요 확인 , local저장 <=> server 비교
  const [likes, setLikes] = useState<boolean>();
  // 갤러리 데이터 받아오기
  const queryResult = useGalleryDetail(id);

  // 로그인 상태 확인 (댓글 기능)
  const user = useSelector((state: RootState) => state.user.user);

  const router = useRouter();
  const dispatch = useDispatch();

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

  return (
    <Container>
      <PostInfo>
        {/* 카테고리 들어갈 자리 */}
        {/* 작성자, 타이틀, 날짜, 조회수 등 */}
        <div className="info-top">
          <p className="title">{data.title}</p>
          <div className="right-side">
            {(data.author === user.id || user.super) && (
              <button className="delete-btn" onClick={e => deleteHandler(e)}>
                삭제
              </button>
            )}
            <p className="likse" onClick={likesHadnler}>
              {likes ? <AiFillLike size="18px" /> : <AiOutlineLike size="18px" />}
            </p>
          </div>
        </div>
        {/* 작성글 */}
        <div className="info-bottom">
          <div className="author-date">
            <span className="author">{data.author}</span>|<span className="date">{data.date}</span>
          </div>
          <div className="views-likes">
            <span className="views">조회수 : {data.views}</span>|<span className="likes">스크랩 : {data.likes}</span>
          </div>
        </div>
      </PostInfo>
      {/* 사진 목록 */}
      <ImgContainer>
        {queryResult.data &&
          queryResult.data.images.map((img, idx) => (
            <Image src={GALLERY_URL(img.src)} alt="image-data" width={500} height={500} key={idx} />
          ))}
      </ImgContainer>
      {/* 댓글 작성하기 */}
      {<AddComment number={data.galleryNumber} author={user.id} src={'gallery'} />}
      {/* 댓글 */}
      {data.comments.map((comment, idx) => (
        <EachComment key={idx} comment={comment} number={data.galleryNumber} src={'gallery'} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: var(--padding-solo) 0;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--margin-solo);
  font-size: var(--size-text);

  .info-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    font-size: var(--size-title);
    font-weight: 400;
  }

  .right-side {
    display: flex;
    align-items: center;
    gap: 10px;

    /* edit, delete btn */
    button {
      background-color: white;
      color: var(--color-dark-blue);
      border: var(--border-solid1) var(--color-dark-blue);
      border-radius: 3px;
      padding: var(--padding-text);

      :hover {
        background-color: var(--color-blue);
        color: white;
      }
    }
  }

  .likse {
    cursor: pointer;
  }

  .info-bottom {
    display: flex;
    justify-content: space-between;
  }

  .author-date {
    display: flex;
    gap: 5px;
  }

  .author {
    font-weight: 400;
  }

  .views-likes {
    display: flex;
    gap: 5px;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: var(--border-solid1) var(--color-light-blue);
  border-radius: 5px;
  padding: var(--padding-content);
  margin: var(--margin-solo) 0;
`;
