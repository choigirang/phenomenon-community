import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import GalleryDetail from '@/components/Gallery/GalleryDetail';

import styled from 'styled-components';

/**
 *
 * @returns 갤러리 개별 목록
 */
export default function GalleryNum() {
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
