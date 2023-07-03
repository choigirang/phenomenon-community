import Head from 'next/head';
import styled from 'styled-components';
import LeftBox from '../components/Home/LeftBox';
import axios from 'axios';
import Login from '@/components/Login';

export default function Home() {
  return (
    <>
      <Head>
        <title>이왜진</title>
      </Head>
      <Container>
        <LeftBox />
        <Login />
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100%;
  padding: 0 calc(100% - 1280px);
  display: grid;
  grid-template-rows: 70% 30%;
`;
