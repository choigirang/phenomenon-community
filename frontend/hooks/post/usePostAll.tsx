import { api } from '@/util/api';
import React from 'react';
import { useQuery } from 'react-query';

export default function usePostAll(page: number) {
  async function fetchPostAll() {
    const response = await api.get(`/all-posts?page=${page}`);
    return response.data;
  }

  return useQuery(['posts', page], fetchPostAll, {
    staleTime: 2000,
  });
}
