import React from 'react';
import Link from 'next/link';

import { Notice } from '@/types/type';

import styled from 'styled-components';

/**
 * @param item 공지사항 데이터
 * notice/index 에서 map을 통한 데이터 아이템
 */
export default function EachNotice(item: Notice) {
  const { title, content, date, noticeNumber } = item;

  return (
    <Each>
      <Linked href={`/notice/${noticeNumber}`}>
        <p className="number">{noticeNumber}</p>
        <p className="title">{title}</p>
        <p className="date">{date}</p>
      </Linked>
    </Each>
  );
}

const Each = styled.li`
  padding-bottom: var(--padding-solo);
  border-bottom: var(--border-text);
`;

const Linked = styled(Link)`
  display: grid;
  grid-template-columns: 100px auto 100px;

  p {
    text-align: center;
  }
`;
