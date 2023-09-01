import React, { useEffect, useState } from 'react';
import { api } from '@/util/api';

import ShowWritingData from './ShowWritingData';
import { PostType } from '@/types/type';

import styled from 'styled-components';
import AddComment from './AddComment';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import EachComment from './EachComment';
import { usePostDetail } from '@/hooks/post/usePostDetail';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/actions/user';
import { useRouter } from 'next/router';

/** 개별 게시글 페이지 */
export default function PostDetail({ id }: { id: number }) {
  const [likes, setLikes] = useState<boolean>();
  // 게시글 받아오기
  const queryResult = usePostDetail(id);
  // 로그인 상태 확인 (댓글 기능)
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const router = useRouter();

  // const findLike = user.likes.find(like => like.postNumber === id);
  // if (findLike) setLikes(true);
  // else setLikes(false);

  useEffect(() => {
    if (user) {
      const checkLike = user.likes.filter(like => like.postNumber === id);
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
  const data: PostType = queryResult.data;

  // 좋아요
  const likesHadnler = () => {
    api.post('/likes', { id: user.id, postNumber: id }).then(res => {
      dispatch(loginSuccess(res.data));
    });
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
              <React.Fragment>
                <button className="edit-btn" onClick={editHandler}>
                  수정
                </button>
                <button className="delete-btn" onClick={e => deleteHandler(e)}>
                  삭제
                </button>
              </React.Fragment>
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
      {<AddComment postNumber={data.postNumber} author={user.id} />}
      {/* 댓글 */}
      {data.comments.map((comment, idx) => (
        <EachComment key={idx} comment={comment} />
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
