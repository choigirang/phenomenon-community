import { Notice } from '@/types/type';
import { api } from '@/util/api';
import { useQuery } from 'react-query';

/** id에 따른 개별 페이지 데이터*/
export function useNoticeDetail(id: number) {
  const fetchPost = async (): Promise<Notice> => {
    const response = await api.get<Notice>(`/notice/${id}`);
    return response.data;
  };
  return useQuery<Notice>(['post', id], fetchPost, {
    staleTime: 2000,
  });
}
