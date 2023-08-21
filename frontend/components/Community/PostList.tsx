import { EachPostProps, PostType } from '@/types/type';
import { api } from '@/util/api';
import React, { useState } from 'react';
import { AiFillLeftSquare, AiFillRightSquare } from 'react-icons/ai';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import EachPost from './EachPost';
import { usePostDetail } from '@/hooks/usePostDetail';
import usePostAll from '@/hooks/usePostAll';

const POST_PAGE = 10;

/** 기본 홈 화면에서 게시글 보여주기 */
export default function PostList() {
  /**  게시글 페이지네이션 */
  const [currentPage, setCurrentPage] = useState<number>(1);

  // const [post, setPost] = useState<PostType[]>();
  const [curIndex, setCurIndex] = useState<number>(0);

  /** 게시글 데이터 함수 */
  const queryResult = usePostAll(currentPage);

  const posts: EachPostProps = queryResult.data;

  return (
    <React.Fragment>
      {/* 게시글 페이지 네이션 */}
      <PostTitle>
        <p className="sub-title">실시간 게시글</p>
        <div className="btn-box">
          <div className="text-box">
            <span className="cur-page">{currentPage}</span>/<span className="total-page">{POST_PAGE}</span>
          </div>
          <button disabled={currentPage <= 1} onClick={() => setCurrentPage(pre => pre - 1)}>
            <AiFillLeftSquare />
          </button>
          <button disabled={currentPage >= POST_PAGE} onClick={() => setCurrentPage(pre => pre + 1)}>
            <AiFillRightSquare />
          </button>
        </div>
      </PostTitle>
      {/* 개별 글 목록 */}
      <ShowAllPost>{posts && posts.posts.map(item => <EachPost key={item.postNumber} item={item} />)}</ShowAllPost>
    </React.Fragment>
  );
}

// 게시글 목록
const PostTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  .sub-title {
    width: 100%;
    color: var(--color-black);
    font-weight: 400;
    font-size: 15px;
    margin: var(--padding-side) 0;
    margin-bottom: 0;
  }

  .btn-box {
    display: flex;
    align-items: center;

    .text-box {
      display: flex;
      font-size: var(--size-text);

      .cur-page {
        color: var(--color-red);
        font-weight: 500;
      }

      .total-page {
        display: flex;
        margin-right: calc(var(--margin-small) - 5px);
        font-size: var(--size-text);
      }
    }

    button {
      display: flex;
      align-items: center;
    }

    svg {
      cursor: pointer;
      width: 20px;
      height: 20px;
      path {
        color: var(--color-dark-blue);
      }
    }
  }
`;

const ShowAllPost = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Post = styled.li`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* 글 관련 */
  .post-box {
    :hover {
      font-weight: 500;
    }
  }

  /* 작성자 관련 */
  .member {
    display: flex;
    gap: 8px;
    font-size: 12px;

    .name {
      font-weight: 400;
      color: var(--color-gray);
    }

    .line {
      border-left: var(--border-content);
      cursor: none;
    }
  }
`;
