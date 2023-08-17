import Head from 'next/head';
import axios from 'axios';

import RightBox from '@/components/Common/RightBox';

import styled from 'styled-components';
import { Container } from '@/styles/GlobalComponents';
import PostList from '@/components/Community/PostList';

export default function Home() {
  return (
    <>
      <Head>
        <title>이왜진</title>
      </Head>
      <Container>
        <PostList />
        <RightBox />
      </Container>
    </>
  );
}
