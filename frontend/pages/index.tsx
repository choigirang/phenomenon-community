import Head from 'next/head';
import styled from 'styled-components';
import LeftBox from '../components/Home/LeftBox';
import RightBox from '@/components/Home/RightBox';
import axios from 'axios';

export default function Home() {
  return (
    <>
      <Head>
        <title>이왜진</title>
      </Head>
      <Container>
        <LeftBox />
        <RightBox />
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100%;
  padding: 0 calc((100% - 1280px) / 2);
  display: grid;
  grid-template-columns: calc(100% - 300px) 200px;
`;
