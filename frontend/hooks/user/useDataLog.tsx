import { api } from '@/util/api';
import React from 'react';
import { useQuery } from 'react-query';

/** 사용자별 작성 데이터 받아오기 */
export default function useDataLog(id: string) {
  async function fetchUserLogData() {
    try {
      const res = await api.get(`/my=${id}`);
      return res.data;
    } catch {
      return new Error('일치하는 유저 정보가 없습니다.');
    }
  }

  return useQuery(['userDataLog', id], fetchUserLogData, {
    staleTime: 2000,
  });
}
