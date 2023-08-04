import Head from 'next/head';
import styled from 'styled-components';
import LeftBox from '../components/Home/LeftBox';
import RightBox from '@/components/Home/RightBox';
import axios from 'axios';
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
