import { Notice } from '@/types/type';
import { api } from '@/util/api';
import { useState } from 'react';
import { useQuery } from 'react-query';

/** id에 따른 개별 페이지 데이터*/
export function useNoticeDetail(id: string) {
  const fetchPost = async (): Promise<Notice> => {
    const response = await api.get<Notice>(`/notice/${id}`);
    return response.data;
  };

  // if (queryResult.isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (queryResult.isError) {
  //   const error = queryResult.error as Error;
  //   return <div>Error: {error.message}</div>;
  // }

  // if (!queryResult.data) {
  //   return <div>No data available</div>;
  // }

  return useQuery<Notice>(['post', id], fetchPost, {
    staleTime: 2000,
  });
}
