import Head from 'next/head';
import axios from 'axios';

import Login from '@/components/Common/Login';
import Category from '@/components/Common/Category';
import PostList from '@/components/Community/PostList';

import styled from 'styled-components';
import { Container } from '@/styles/GlobalComponents';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Footer from '@/components/Common/Footer';

export default function Home() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      <Head>
        <title>이왜진</title>
      </Head>
      <Container>
        <LeftSide>
          <Category />
          <PostList />
        </LeftSide>
        <Login />
      </Container>
      <Footer />
    </>
  );
}

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;
