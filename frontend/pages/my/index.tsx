import { RootState } from '@/redux/store';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const userFetchData = async (user: string) => {
  const res = await api.get(`/my=${user}`);
  return res.data;
};

export default function index() {
  const [data, setData] = useState();

  const user = useSelector((state: RootState) => state.user.user);

  const router = useRouter();

  useEffect(() => {
    if (user.login) {
      const fetchData = async () => {
        const result = await userFetchData(user.id);
        console.log(result);
      };
      fetchData();
    } else {
      router.push('/');
    }
  }, [user.id]);

  return <Container>{data}</Container>;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px calc(100% - 300px);
`;
