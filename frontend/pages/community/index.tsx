import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { api } from '@/util/api';
import Login from '@/components/Common/Login';
import EachPost from '@/components/Community/EachPost';
import Category from '../../components/Common/Category';
import Pagination from '@/components/Common/Pagenation';
import { PostType } from '@/types/type';
import { CATEGORY } from '@/constant/constant';

import styled from 'styled-components';
import { Container } from '@/styles/GlobalComponents';

/**
 *
 * @returns community의 main page 게시글, 갤러리 등
 */
export default function Index() {
  // 게시글 리스트
  const [postList, setPostList] = useState<PostType[]>([]);
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지 네이션에 따른 보여질 게시글 설정
  const [totalPosts, setTotalPosts] = useState(0);
  const router = useRouter();
  let category = router.query.category as string;

  /** api 요청 함수 */
  async function fetchData() {
    const res = await api.get(`/posts/category=${category}&page=${currentPage}`).then(res => {
      setPostList(res.data.posts);
      setTotalPosts(res.data.totalPosts);
    });
    return res;
  }

  const { data } = useQuery([`posts`], fetchData, {
    staleTime: 2000,
  });

  // 카테고리별 게시글 받아오기
  useEffect(() => {
    if (!category) {
      // 카테고리가 지정되지 않았을 경우, 기본 카테고리 'all'로 설정
      router.push('/community?category=all');
      return;
    }

    // 페이지네이션과 함께 카테고리도 고려하여 요청 보내기
    api.get(`/posts?category=${category}&page=${currentPage}`).then(res => {
      setPostList(res.data.posts);
      setTotalPosts(res.data.totalPosts);
    });
  }, [router, currentPage, category]);

  // 카테고리별
  function findKeyByValue(obj: { [key: string]: string }, value: string) {
    const keys = Object.keys(obj);
    const foundKey = keys.find(key => obj[key] === value);
    return foundKey || null; // 원하는 value를 찾지 못한 경우
  }

  const findCategory = findKeyByValue(CATEGORY, category);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <Container>
      <CommunityContainer>
        <Category />
        <BestPost>
          <p className="sub-title">{findCategory} 전체보기</p>
          <p className="post-total">{/* {pageCount * 10}/{totalPosts} */}</p>
        </BestPost>
        {postList && postList.map(post => <EachPost key={post.postNumber} item={post} />)}
        {/* 페이지네이션 컴포넌트 */}
        <Pagination
          pageCount={Math.ceil(totalPosts / 10)}
          initialPageCount={Math.ceil(totalPosts / 10)}
          onPageChange={handlePageChange}
        />
      </CommunityContainer>
      <Login />
    </Container>
  );
}

const CommunityContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--padding-content);
  padding-left: 0;
  padding-top: 0;

  .none-data {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    font-size: var(--size-text);
  }
`;

const BestPost = styled.div`
  display: flex;
  width: 100%;
  border-bottom: var(--border-solid1) var(--color-blue);
  margin: var(--padding-side) 0 0;
  font-size: var(--size-text);
`;
