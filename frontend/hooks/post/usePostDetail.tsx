import { PostType } from '@/types/type';
import { api } from '@/util/api';
import { useQuery } from 'react-query';

/** id에 따른 개별 페이지 데이터*/
export function usePostDetail(id: number) {
  const fetchPost = async (): Promise<PostType> => {
    const response = await api.get<PostType>(`/post/${id}`);
    return response.data;
  };
  const queryResult = useQuery<PostType>(['post', id], fetchPost, {
    staleTime: 2000,
  });

  if (queryResult.isLoading) {
    // 데이터 로딩 중에는 Loading 컴포넌트를 반환
    return {
      ...queryResult,
      data: undefined,
    };
  }

  if (queryResult.isError) {
    // 에러 발생 시 Error 컴포넌트를 반환
    return {
      ...queryResult,
      data: undefined,
    };
  }

  if (!queryResult.data) {
    // 데이터 없을 때 No Data 컴포넌트를 반환
    return {
      ...queryResult,
      data: undefined,
    };
  }

  return queryResult;
}
