import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

export default function AddNoticeBtn() {
  return <NoticeBtn href="/notice/add">공지사항 작성</NoticeBtn>;
}

const NoticeBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-top: var(--margin-small);
  background-color: var(--color-blue);
  color: white;
  font-size: var(--size-text);
  font-weight: 400;

  :visited {
    color: white;
  }
`;
