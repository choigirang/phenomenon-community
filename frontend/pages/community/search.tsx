import EachPost from '@/components/Community/EachPost';
import { PostType } from '@/types/type';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function search() {
  const [result, setResult] = useState<PostType[]>();
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
      {result && result.map(item => <EachPost key={item.postNumber} item={item} />)}
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
