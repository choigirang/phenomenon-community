import { PostType } from '@/types/type';
import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import { AiFillLeftSquare, AiFillRightSquare } from 'react-icons/ai';
import styled from 'styled-components';
import EachPost from './EachPost';
import usePostAll from '@/hooks/post/usePostAll';
import Link from 'next/link';
import { UseQueryResult, useQuery } from 'react-query';

/** 기본 홈 화면에서 게시글 보여주기 */
export default function PostList() {
  async function fetchData() {
    const response = await api.get(`/posts/latest`);
    return response.data;
  }

  const { data } = useQuery(['latest'], fetchData, {
    staleTime: 2000,
  });

  return (
    <React.Fragment>
      {/* 게시글 페이지 네이션 */}
      <PostTitle>
        <p className="sub-title">최근 게시글</p>
        <Link href={'/community'} className="more">
          더 보기
        </Link>
      </PostTitle>
      {/* 개별 글 목록 */}
      <ShowAllPost>{data && data.map((item: PostType) => <EachPost key={item.postNumber} item={item} />)}</ShowAllPost>
    </React.Fragment>
  );
}

// 게시글 목록
const PostTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  font-size: 12px;
  color: var(--color-black);
  margin: var(--padding-side) 0;
  margin-bottom: 0;

  .sub-title {
    font-size: var(--size-sub-title) !important;
  }

  a {
    white-space: nowrap;
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
