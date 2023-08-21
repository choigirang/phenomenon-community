import { RootState } from '@/redux/store';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import UserCard from '../../components/User/UserCard';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/actions/user';

const userFetchData = async (user: string) => {
  const res = await api.get(`/my=${user}`);
  return res.data;
};

export default function index() {
  const [data, setData] = useState();

  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (user.login) {
      const fetchData = async () => {
        const result = await userFetchData(user.id);
        setData(result);
      };
      fetchData();
    } else {
      /** redux 초기화 임시 */
      const localUserData = localStorage.getItem('user');

      // 초기화 시, 저장 데이터 있으면 redux 상태저장
      // 없으면 홈 이동

      if (localUserData) dispatch(loginSuccess(JSON.parse(localUserData)));
      else router.push('/');
    }
  }, [router]);

  return (
    <Container>
      <UserCard />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px calc(100% - 300px);
`;
