import React from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';

/** post page || Login 컴포넌트에서 사용될 게시글 추가 버튼 */
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
