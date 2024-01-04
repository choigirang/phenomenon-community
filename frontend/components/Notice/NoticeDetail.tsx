import React from 'react';

import { Notice } from '@/types/type';
import { useNoticeDetail } from '@/hooks/notice/useNoticeDetail';
import ShowWritingData from '../Community/ShowWritingData';

import styled from 'styled-components';

/**
 * @param id 공지사항 번호
 * notice/[id] 에서 사용될 공지사항 세부 데이터
 */
export default function NoticeDetail({ id }: { id: string }) {
  const queryResult = useNoticeDetail(id);

  if (queryResult.isLoading) {
    return <div>Loading...</div>;
  }

  if (queryResult.isError) {
    const error = queryResult.error as Error;
    return <div>Error: {error.message}</div>;
  }

  if (!queryResult.data) {
    return <div>No data available</div>;
  }

  // 게시글 데이터
  const data: Notice = queryResult.data;

  return (
    <Container>
      <Top>
        <p className="title">{data.title}</p>
        <p className="date">작성일 : {data.date}</p>
      </Top>
      <ShowWritingData data={data.content} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding-top: var(--padding-solo);
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--padding-content);
  border: var(--border-solid1) var(--color-dark-blue);
  background-color: var(--color-light-gray);
  font-size: var(--size-title);

  .title {
    text-align: center;
  }

  .date {
    font-size: var(--size-sub-title);
    text-align: end;
  }
`;
