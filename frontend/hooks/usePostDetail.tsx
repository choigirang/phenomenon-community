import { PostType } from '@/types/type';
import { api } from '@/util/api';
import { useQuery } from 'react-query';

/** id에 따른 개별 페이지 or page number에 따른 전체 데이터*/
export function usePostDetail(id: number) {
  const fetchPost = async (): Promise<PostType> => {
    const response = await api.get<PostType>(`/post/${id}`);
    return response.data;
  };
  return useQuery<PostType>(['post', id], fetchPost, {
    staleTime: 2000,
  });
}
