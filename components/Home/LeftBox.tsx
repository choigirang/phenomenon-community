import { PostType } from '@/types/type';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { AiFillLeftSquare, AiFillRightSquare } from 'react-icons/ai';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const POST_PAGE = 10;

export default function LeftBox() {
  // 게시글 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [post, setPost] = useState<PostType[]>();
  const [curIndex, setCurIndex] = useState<number>(0);
  // 카테고리 가져오기
  const category = ['임시'];
  const tem = Array(30).fill(category).flat();

  // 임시 데이터
  async function fetch() {
    return await axios.get('/dummy').then(res => res.data);
  }

  const { isLoading, data, isError, error } = useQuery<PostType[]>(['post'], () => fetch(), { staleTime: 2000 });

  // 데이터 함수
  // 게시글 데이터 함수
  // async function fetch(page: number) {
  //   return await axios.get(`https://locallhost:3000/post?page?=${currentPage}`).then(res => res.data);
  // }

  // 게시글 데이터 쿼리
  // const { isLoading, data, isError, error } = useQuery<PostType[]>(['post'], () => fetch(currentPage), {
  //   staleTime: 2000,
  // });

  return (
    <Container>
      <CategoryBox>
        <Category>
          <p className="sub-title">전체보기</p>
          <CategoryList>
            {tem.map((item, idx) => (
              <CategoryItem key={idx}>
                <span>{item}</span>
              </CategoryItem>
            ))}
          </CategoryList>
        </Category>
      </CategoryBox>
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
      <PostList>
        {data &&
          data.map(item => (
            <Post key={item.id}>
              <a href="/" className="post-box">
                <span className="post-title">{item.title}</span>
              </a>
              <a href="/" className="member">
                <span className="name">{item.name}</span>
                <span className="line"></span>
                <span>{item.createdAt.toString()}</span>
              </a>
            </Post>
          ))}
      </PostList>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

// 카테고리 상자
const CategoryBox = styled.div`
  width: 100%;
  height: 170px;
  padding: var(--padding-solo) 0;
`;

const Category = styled.div`
  width: 100%;
  height: 100%;
  border: var(--border-content);
  padding: var(--padding-content);

  .sub-title {
    width: 100%;
    font-weight: 500;
    font-size: 12px;
    padding-bottom: var(--padding-solo);
    border-bottom: var(--border-dash);
  }
`;

// 카테고리 목록
const CategoryList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const CategoryItem = styled.li`
  padding: var(--padding-content);
  padding-left: 0;
  font-size: var(--size-text);

  span:hover {
    cursor: pointer;
    border-bottom: var(--border-text);
    font-weight: 400;
  }
`;

// 게시글 목록
const PostTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: solid 3px var(--color-blue);

  .sub-title {
    width: 100%;
    color: var(--color-black);
    font-weight: 400;
    font-size: 15px;
    margin: var(--padding-side) 0;
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

const PostList = styled.ul`
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
