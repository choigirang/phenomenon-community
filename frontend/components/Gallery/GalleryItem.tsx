import { GalleryData } from '@/types/type';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { GALLERY_URL } from '@/constant/constant';
import Link from 'next/link';

export default function GalleryItem({ data }: { data: GalleryData }) {
  return (
    <React.Fragment>
      <Container>
        <Link href={`/gallery/${data.galleryNumber}`}>
          <div className="info-box">
            <p className="title">{data.title}</p>
            <p className="date">{data.date}</p>
          </div>
          <Image
            src={GALLERY_URL(data.images[0].src)}
            alt="preview-image"
            className="pre-img"
            width={100}
            height={100}
          />
        </Link>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.li`
  width: 100%;
  border: var(--border-solid3) var(--color-light-blue);
  border-radius: 3px;
  box-shadow: 3px 3px 3px var(--color-light-gray);
  position: relative;
  color: white;
  background-color: var(--color-light-blue);
  transition: transform 0.4s ease; /* transform 속성에 transition 추가 */

  a:hover {
    transform: scale(1.03); // hover 시 크기를 1.3배로 확대
    cursor: pointer;
  }

  a:link,
  a:visited {
    color: white;
  }

  .info-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--padding-text);
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    min-height: 70px;
    background: rgba(0, 0, 0, 0.5);
  }

  .date {
    font-size: var(--size-text);
    width: 100%;
    text-align: end;
  }

  img {
    width: 100%;
    height: auto;
  }
`;
