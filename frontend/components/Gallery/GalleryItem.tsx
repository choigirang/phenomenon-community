import { GalleryData } from '@/types/type';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { GALLERY_URL } from '@/constant/constant';

export default function GalleryItem({ data }: { data: GalleryData }) {
  return (
    <Container>
      <Image src={GALLERY_URL(data.images[0].src)} alt="preview-image" className="pre-img" width={100} height={100} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: var(--padding-content);
  border: var(--border-solid1) var(--color-dark-blue);
  border-radius: 5px;
`;
