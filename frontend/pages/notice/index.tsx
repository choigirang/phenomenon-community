import React from 'react';
import { useQuery } from 'react-query';

import { api } from '@/util/api';
import EachNotice from '@/components/Notice/EachNotice';
import ListDivision from '@/components/Notice/ListDivision';
import { Notice } from '@/types/type';

import styled from 'styled-components';

const fetchNotice = async (): Promise<Notice[]> => {
  const res = await api.get('/notice');
  return res.data;
};

/**
 *
 * @returns 공지사항 전체 게시글 보여줄 메인 페이지
 */
export default function Index() {
  const { data } = useQuery(['notice'], fetchNotice, { staleTime: 2000 });

  return (
    <Contaner>
      <Title>공지사항</Title>
      <ListDivision />
      <List>{data && data.map(item => <EachNotice key={item.noticeNumber} {...item} />)}</List>
    </Contaner>
  );
}

const Contaner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--padding-content);
  font-size: var(--size-text);
`;

const Title = styled.p`
  font-size: var(--size-title);
  font-weight: 400;
  margin-bottom: var(--margin-solo);
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding-top: var(--padding-solo);
`;
