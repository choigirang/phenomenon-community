import { GalleryType } from '@/types/type';
import { api } from '@/util/api';
import React from 'react';
import { useQuery } from 'react-query';

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
