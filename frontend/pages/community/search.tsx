import EachPost from '@/components/Community/EachPost';
import GalleryItem from '@/components/Gallery/GalleryItem';
import { PostType, SearchKeyword } from '@/types/type';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function search() {
  const [result, setResult] = useState<SearchKeyword>();
  const router = useRouter();
  const { keyword } = router.query;

  useEffect(() => {
    api
      .get(`/search?keyword=${keyword}`)
      .then(res => {
        setResult(res.data);
      })
      .catch(err => console.log(err));
  }, [keyword]);

  return (
    <Container>
      <p className="title">
        "<span className="keyword">{keyword}</span>" 로 검색한 결과입니다.
      </p>
      <Title>갤러리</Title>
      <GalleryList>
        {result && result.searchGalleryResults.map(item => <GalleryItem key={item.galleryNumber} data={item} />)}
      </GalleryList>
      <Title>게시글</Title>
      {result && result.searchPostResults.map(item => <EachPost key={item.postNumber} item={item} />)}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: var(--padding-content);
  display: flex;
  flex-direction: column;

  .keyword {
    font-weight: 500;
  }
`;

const Title = styled.p`
  margin: var(--padding-side) 0;
  margin-bottom: 0;
  padding-bottom: var(--padding-solo);
  border-bottom: var(--border-dash);
`;

const GalleryList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;
