import React, { useEffect, useState } from 'react';

import Login from '@/components/Common/Login';

import { Container } from '@/styles/GlobalComponents';
import styled from 'styled-components';
import Category from '../../components/Common/Category';
import usePostAll from '../../hooks/post/usePostAll';
import { useRouter } from 'next/router';
import { PostType } from '@/types/type';
import { api } from '@/util/api';
import EachPost from '@/components/Community/EachPost';
import { CATEGORY } from '@/constant/constant';

export default function index() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const router = useRouter();
  let category = router.query.category as string;

  // 카테고리별 게시글 받아오기
  useEffect(() => {
    if (!category) category = 'all';
    api.get(`/posts/${category}`).then(res => {
      setPosts(res.data);
    });
  }, [router.query]);

  // 카테고리별
  function findKeyByValue(obj: { [key: string]: string }, value: string) {
    const keys = Object.keys(obj);
    const foundKey = keys.find(key => obj[key] === value);
    return foundKey || null; // 원하는 value를 찾지 못한 경우
  }

  const findCategory = findKeyByValue(CATEGORY, category);

  return (
    <Container>
      <CommunityContainer>
        <Category />
        <BestPost>
          <p className="sub-title">{findCategory} 전체보기</p>
        </BestPost>
        {posts.map(post => (
          <EachPost key={post.postNumber} item={post} />
        ))}
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
`;

const BestPost = styled.div`
  width: 100%;

  .sub-title {
    border-bottom: var(--border-solid1) var(--color-blue);
    margin: var(--padding-side) 0 0;
  }
`;
