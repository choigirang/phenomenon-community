import React, { useEffect } from 'react';
import Link from 'next/link';

import { Likes } from '@/types/type';

import styled from 'styled-components';

/**
 *
 * @param user 누른 좋아요 게시글
 * @returns UserData에서 사용되는 유저가 누른 좋아요 게시글
 */
export default function UserLikes(user: Likes) {
  const { postNumber, author, title, body } = user;

  const viewContainerRef = React.useRef<HTMLDivElement>(null);

  // useEffect
  useEffect(() => {
    if (viewContainerRef.current) {
      viewContainerRef.current.innerHTML += body;
    }
  }, [body]);

  return (
    <Container>
      <Linked href={`/community/post/${postNumber}`}>
        <Top>
          <div className="top">
            <p className="title">{title}</p>
            <p className="author">{author}</p>
          </div>
          <p className="body" ref={viewContainerRef} />
        </Top>
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
  flex-direction: column;
  gap: 10px;

  .top {
    display: flex;
    justify-content: space-between;
  }
`;
