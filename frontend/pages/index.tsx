import Head from 'next/head';
import axios from 'axios';

import Login from '@/components/Common/Login';
import Category from '@/components/Common/Category';
import PostList from '@/components/Community/PostList';

import styled from 'styled-components';
import { Container } from '@/styles/GlobalComponents';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { api } from '@/util/api';
import { GalleryType } from '@/types/type';
import GalleryItem from '@/components/Gallery/GalleryItem';
import Link from 'next/link';

export default function Home() {
  const [galleryData, setGalleryData] = useState<GalleryType[]>([]);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    api.get('/gallery/latest').then(res => setGalleryData(res.data));
  }, []);
  return (
    <>
      <Head>
        <title>이왜진</title>
      </Head>
      <Container>
        <LeftSide>
          <GalleryTitle>
            <span>최근 갤러리</span>
            <Link href="/gallery">더 보기</Link>
          </GalleryTitle>
          <GalleryList>
            {galleryData && galleryData.map(data => <GalleryItem data={data} key={data.galleryNumber} />)}
          </GalleryList>
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

const GalleryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-black);
  font-weight: 400;
  font-size: 15px;
  margin: var(--padding-side) 0;
  margin-bottom: 0;
  padding-bottom: var(--padding-solo);
  border-bottom: var(--border-dash);

  a {
    font-size: var(--size-text);
  }
`;

const GalleryList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-top: var(--padding-solo);
  gap: 10px;
  margin-bottom: var(--margin-solo);
`;
