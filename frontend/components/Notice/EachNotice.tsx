import { Notice } from '@/types/type';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

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
