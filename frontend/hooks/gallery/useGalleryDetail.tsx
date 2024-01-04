import { useQuery } from 'react-query';

import { GalleryType } from '@/types/type';
import { api } from '@/util/api';

/**
 *
 * @param id 갤러리 포스터 넘버
 * @returns 포스터 넘버에 해당하는 갤러리 데이터 요청
 */
export default function useGalleryDetail(id: number) {
  const fetchPost = async (): Promise<GalleryType> => {
    const response = await api.get<GalleryType>(`/gallery/${id}`);
    return response.data;
  };
  const queryResult = useQuery<GalleryType>(['post', id], fetchPost, {
    staleTime: 2000,
  });

  return queryResult;
}
