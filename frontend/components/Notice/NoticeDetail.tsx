import { useNoticeDetail } from '@/hooks/notice/useNoticeDetail';
import { Notice } from '@/types/type';
import React from 'react';

export default function NoticeDetail({ id }: { id: number }) {
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

  return <div>NoticeDetail</div>;
}
