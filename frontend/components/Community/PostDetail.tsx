import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '@/redux/store';

import { usePostDetail } from '@/hooks/post/usePostDetail';
import { api } from '@/util/api';
import { PostType } from '@/types/type';
import ShowWritingData from './ShowWritingData';
import AddComment from './AddComment';
import EachComment from './EachComment';

import styled from 'styled-components';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

/** 개별 게시글 페이지
 * @param id 게시글 번호에 따라 개별 데이터 받아
 * community/index 에서 연결될 페이지
 */
export default function PostDetail({ id }: { id: number }) {
  // usePostDetail에서 받아올 좋아요 여부
  const [likes, setLikes] = useState<boolean>(false);

  // 로그인 상태 확인 (댓글 기능)
  const user = useSelector((state: RootState) => state.user.user);

  // 게시글 받아오기
  const queryResult = usePostDetail(id);

  const checkLikes = queryResult.data && queryResult.data.likes.indexOf(`${user.id}`);

  useEffect(() => {
    if (checkLikes) setLikes(true);
    else setLikes(false);
  }, [checkLikes]);

  const router = useRouter();

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
  const data: PostType = queryResult.data;

  // 좋아요
  const likesHadnler = () => {
    api
      .post('/post/likes', { id: user.id, postNumber: id })
      .then(res => {
        if (checkLikes) setLikes(false);
        else setLikes(true);
      })
      .catch(res => console.log('서버 오류'));
  };

  // 글 삭제
  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    api.delete(`/post/${data.postNumber}`).then(res => {
      alert('게시글이 삭제되었습니다.');
      router.push('/');
    });
  };

  // 글 수정
  const editHandler = () => {
    router.push(`/community/edit/${data.postNumber}`);
  };

  return (
    <Container>
      <PostInfo>
        {/* 카테고리 들어갈 자리 */}
        {/* 작성자, 타이틀, 날짜, 조회수 등 */}
        <div className="info-top">
          <p className="title">{data.title}</p>
          <div className="right-side">
            {data.author === user.id && (
              <button className="edit-btn" onClick={editHandler}>
                수정
              </button>
            )}
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
      {/* 작성한 데이터 */}
      <ShowWritingData data={data.body} />
      {/* 댓글 작성하기 */}
      {<AddComment number={data.postNumber} author={user.id} src={'post'} />}
      {/* 댓글 */}
      {data.comments.map((comment, idx) => (
        <EachComment key={idx} comment={comment} number={data.postNumber} src={'post'} />
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
