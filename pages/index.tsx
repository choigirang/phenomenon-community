import Head from 'next/head';
import { styled } from 'styled-components';
import LeftBox from '../components/Home/LeftBox';

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
  padding: 0 calc(100% - 1280px);
`;
