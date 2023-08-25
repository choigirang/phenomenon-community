import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export default function AddNoticeBtn() {
  const router = useRouter();

  function moveNotice() {
    return router.push('/notice/add');
  }
  return <NoticeBtn onClick={moveNotice}>공지사항 작성</NoticeBtn>;
}

const NoticeBtn = styled.button`
  width: 100%;
  height: 30px;
  margin-top: var(--margin-solo);
  background-color: var(--color-blue);
  color: white;
`;
