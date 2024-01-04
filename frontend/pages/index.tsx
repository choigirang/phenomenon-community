import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from 'react-query';

import { api } from '@/util/api';
import Login from '@/components/Common/Login';
import PostList from '@/components/Community/PostList';
import GalleryItem from '@/components/Gallery/GalleryItem';
import { GalleryType } from '@/types/type';

import styled from 'styled-components';
import { Container } from '@/styles/GlobalComponents';

export default function Home() {
  async function fetchGalleryLatest() {
    const res = await api.get('/gallery/latest');
    return res.data;
  }

  const { data: galleryData } = useQuery(['gallery', 'latest'], fetchGalleryLatest, {
    staleTime: 2000,
  });

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
            {galleryData &&
              galleryData.map((data: GalleryType) => <GalleryItem data={data} key={data.galleryNumber} />)}
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
