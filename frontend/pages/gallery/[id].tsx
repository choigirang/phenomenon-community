import GalleryDetail from '@/components/Gallery/GalleryDetail';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function galleryNum() {
  const [galleryNum, setGalleryNum] = useState<number | undefined>();
  const router = useRouter();

  useEffect(() => {
    const id = Number(router.query.id);
    setGalleryNum(id);
  }, [router]);

  return <Container>{galleryNum && <GalleryDetail id={galleryNum} />}</Container>;
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;
