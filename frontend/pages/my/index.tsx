import React from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { api } from '@/util/api';
import UserCard from '../../components/User/UserCard';
import UserData from '@/components/User/UserData';

import styled from 'styled-components';

/**
 *
 * @returns 마이 페이지, 유저 카드와 유저가 작성한 데이터 반환
 */
export default function Index() {
  const router = useRouter();

  const { id } = router.query;

  async function fetchUserData() {
    const res = await api.get(`/my?id=${id}`);
    return res.data;
  }

  const { data } = useQuery(['my', id], fetchUserData, {
    staleTime: 2000,
  });

  return (
    <Container>
      {data && (
        <>
          <UserCard data={data.userInfo} />
          <UserData data={data} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px calc(100% - 300px);
  gap: 20px;
`;
