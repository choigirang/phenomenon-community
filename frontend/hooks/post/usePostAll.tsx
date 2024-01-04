import { useQuery } from 'react-query';

import { api } from '@/util/api';

/**
 *
 * @param page 페이지 번호
 * @returns 페이지 번호에 따른 게시글 데이터 요청
 */
export default function usePostAll(page?: number) {
  async function fetchPostAll() {
    const response = await api.get(`/posts?page=${page}`);
    return response.data;
  }

  return useQuery(['posts', page], fetchPostAll, {
    staleTime: 2000,
  });
}
