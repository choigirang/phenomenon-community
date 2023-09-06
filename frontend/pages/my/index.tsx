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

export default function index() {
  const [data, setData] = useState<User>();

  // app 컴포넌트에서 localStrage활용하여 유저 데이터 저장
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user.login) {
      router.push('/');
    }

    setData(user);
  }, [router]);

  return (
    <Container>
      {data && (
        <>
          <UserCard data={data} />
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
