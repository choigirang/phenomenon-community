import usePostForm from '@/hooks/post/usePostForm';
import useInputs from '@/hooks/common/useInputs';
import { RootState } from '@/redux/store';
import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

/** 댓글 추가하기 */
export default function AddComment({ number, author, src }: { number: number; author: string; src: string }) {
  const [content, setContent] = useState('');

  const { dateHandler } = usePostForm();

  const user = useSelector((state: RootState) => state.user.user);

  const fetchCommentData = () => {
    if (content) {
      const postData = { postNumber: number, author, comment: content, date: dateHandler() };
      const galleryData = { galleryNumber: number, author, comment: content, date: dateHandler() };

      if (src === 'post') api.post('/post/comment', postData).then(res => console.log(res));
      if (src === 'gallery') api.post('/gallery/comment', galleryData).then(res => console.log(res));
      setContent('');
    }
  };

  return (
    <Container>
      <textarea
        rows={4} // 원하는 행의 수를 지정합니다.
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={fetchCommentData} disabled={!user.login}>
        제출
      </button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  gap: 20px;
  border: var(--border-solid1) black;
  border-radius: 3px;
  padding: var(--padding-content);
  background-color: var(--color-dark-white);

  textarea {
    width: 100%;
    padding: var(--padding-text);
  }

  button {
    width: 10%;
    background-color: var(--color-light-gray);
    border-radius: 5px;

    :hover {
      background-color: var(--color-blue);
      color: white;
    }
  }
`;
