import { PostType } from '@/types/type';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function LeftBox() {
  const [post, setPost] = useState<PostType[]>();
  const category = ['임시'];

  const tem = Array(10).fill(category).flat();

  useEffect(() => {
    axios.get('/dummy').then(res => {
      setPost(res.data);
    });
  }, []);

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
      <PostBox>
        <p className="sub-title">실시간 게시글</p>
        <PostList>
          {post &&
            post.map(item => (
              <Post key={item.id}>
                <a className="">
                  <span className="post-title">{item.title}</span>
                </a>
              </Post>
            ))}
        </PostList>
      </PostBox>
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
const PostBox = styled.div`
  width: 100%;

  .sub-title {
    width: 100%;
    color: var(--color-black);
    font-weight: 400;
    font-size: 15px;
    margin-top: var(--padding-side);
    padding-bottom: var(--padding-solo);
    border-bottom: solid 3px var(--color-blue);
  }
`;

const PostList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Post = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
