import { RootState } from '@/redux/store';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import UserCard from '../../components/User/UserCard';
import { useDispatch } from 'react-redux';
import { User } from '@/types/type';
import UserData from '@/components/User/UserData';
import { useQuery } from 'react-query';

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
