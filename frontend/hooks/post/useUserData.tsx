import { api } from '@/util/api';
import { useQuery } from 'react-query';

/**
 * my 페이지 데이터 조회
 * @param data 조회할 데이터
 * @param page 페이지 번호
 * @param id 조회할 사용자
 */
export function useUserData(data: string, page: number, id: string) {
  async function fetchData() {
    const res = await api.get(`/my/${data}?user=${id}&page=${page}`);
    return res.data;
  }

  return useQuery([data, page], fetchData, {
    staleTime: 2000,
  });
}
