import React, { useEffect } from 'react';
import Link from 'next/link';

import { PostType } from '@/types/type';

import styled from 'styled-components';

/**
 *
 * @param post 유저가 작성한 포스팅 데이터
 * @returns UserData에서 넘겨받아 사용하는 유저 작성 데이터
 */
export default function UserPostData({ post }: { post: PostType }) {
  // 카테고리 추가

  const viewContainerRef = React.useRef<HTMLDivElement>(null);

  // useEffect
  useEffect(() => {
    if (viewContainerRef.current) {
      viewContainerRef.current.innerHTML += post.body;
    }
  }, [post.body]);

  return (
    <Container>
      <Linked href={`/community/post/${post.postNumber}`}>
        <Top>
          <p className="title">{post.title}</p>
          <p className="date">{post.date}</p>
        </Top>
        <div className="body" ref={viewContainerRef} />
      </Linked>
    </Container>
  );
}

const Container = styled.li`
  height: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(129, 129, 250, 0.2);
  padding: var(--padding-content);
  font-size: var(--size-text);

  .title {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-dark-gray);
  }

  .body {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const Linked = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
