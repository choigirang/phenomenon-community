import React, { useState } from 'react';

import { CommentType } from '@/types/type';

import styled from 'styled-components';
import { api } from '@/util/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

/** 댓글 */

export default function EachComment({ comment, number }: { comment: CommentType; number: number }) {
  const [editMode, setEditMode] = useState(false);
  const [newBody, setNewBody] = useState('');
  const user = useSelector((state: RootState) => state.user.user);

  const handleEdit = async () => {
    try {
      const response = await api.post(`/posts/${number}/comments/${comment.commentNumber}`, {
        body: newBody,
      });
      if (response.status === 200) {
        setEditMode(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/posts/${number}/comments/${comment.commentNumber}`);
      if (response.status === 200) {
        // handle successful deletion here
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <BodyContainer>
        <div className="author-date">
          <p className="author">{comment.author}</p>
          <p className="date">{comment.date}</p>
        </div>
        {editMode ? (
          <div>
            <textarea
              rows={4} // 원하는 행의 수를 지정합니다.
              value={comment.comment}
              onChange={e => setNewBody(e.target.value)}
            />
            <button onClick={handleEdit}>Submit</button>
          </div>
        ) : (
          <p className="body">{comment.comment}</p>
        )}
      </BodyContainer>
      {user.id === comment.author && (
        <BtnBox>
          <button onClick={() => setEditMode(!editMode)}>수정</button>
          {user.super && <button onClick={handleDelete}>삭제</button>}
        </BtnBox>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  min-height: 100px;
  padding: var(--padding-content);
  border: var(--border-solid1) var(--color-dark-blue);

  .author-date {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--margin-small);
  }

  .author {
    font-size: var(--size-sub-title);
    font-weight: 400;
  }

  .date {
    font-size: var(--size-text);
    color: var(--color-dark-gray);
  }

  .body {
    font-size: var(--size-text);
    color: var(--color-dark-gray);
  }
`;

const BodyContainer = styled.div`
  width: 100%;
`;

const BtnBox = styled.div`
  min-width: 200px;
  display: flex;
  gap: 10px;

  button {
    width: 100%;
    border-radius: 5px;

    :hover {
      background-color: var(--color-dark-blue);
      color: white;
    }
  }
`;
