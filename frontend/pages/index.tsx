import Head from 'next/head';
import axios from 'axios';

import Login from '@/components/Common/Login';
import Category from '@/components/Community/Category';
import PostList from '@/components/Community/PostList';

import styled from 'styled-components';
import { Container } from '@/styles/GlobalComponents';

export default function Home() {
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
    </>
  );
}

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;
