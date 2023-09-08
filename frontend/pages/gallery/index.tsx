import Login from '@/components/Common/Login';
import GalleryItem from '@/components/Gallery/GalleryItem';
import { GalleryType } from '@/types/type';
import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function index() {
  const [data, setData] = useState<GalleryType[]>([]);

  useEffect(() => {
    api.get('/gallery').then(res => setData(res.data));
  }, []);

  return (
    <Container>
      <GalleryList>{data && data.map(data => <GalleryItem data={data} key={data.galleryNumber} />)}</GalleryList>
      <Login />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 calc((100% - 1280px) / 2);
  padding-top: 10px;
  display: grid;
  grid-template-columns: calc(100% - 300px) 300px;
  grid-row-end: auto;
  justify-content: space-between;
`;

const GalleryList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;
