import React from 'react';

import { CommentType } from '@/types/type';

import styled from 'styled-components';

/** 댓글 */
export default function EachComment({ comment }: { comment: CommentType }) {
  return (
    <Container>
      <p className="author">{comment.author}</p>
      <p className="body">{comment.comment}</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--color-light-gray);
  padding: var(--padding-content);

  .author {
    font-size: var(--size-sub-title);
    font-weight: 400;
  }

  .body {
    font-size: var(--size-text);
  }
`;
