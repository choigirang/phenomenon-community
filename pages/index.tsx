import Head from 'next/head';
import styled from 'styled-components';
import LeftBox from '../components/Home/LeftBox';
import axios from 'axios';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>이왜진</title>
      </Head>
      <LeftBox />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
