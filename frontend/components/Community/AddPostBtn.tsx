import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

export default function AddPostBtn() {
  const router = useRouter();

  function movePost() {
    return router.push('/community/add');
  }

  return <PostBtn onClick={movePost}>게시글 작성</PostBtn>;
}

const PostBtn = styled.button`
  width: 100%;
  height: 30px;
  margin-top: var(--margin-solo);
  background-color: var(--color-blue);
  color: white;
`;
