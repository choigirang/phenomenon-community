import Head from 'next/head';
import axios from 'axios';

import LeftBox from '../components/Common/LeftBox';
import RightBox from '@/components/Common/RightBox';

import styled from 'styled-components';
import { Container } from '@/styles/GlobalComponents';

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
