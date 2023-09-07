import Login from '@/components/Common/Login';
import GalleryItem from '@/components/Gallery/GalleryItem';
import { Container } from '@/styles/GlobalComponents';
import { GalleryData } from '@/types/type';
import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function index() {
  const [data, setData] = useState<GalleryData[]>([]);

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

const GalleryList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
