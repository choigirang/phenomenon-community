import { api } from '@/util/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import PostTop from '../Post/PostTop';

export default function PostShow() {
  const router = useRouter();
  const { id } = router.query;

  function fetchPost() {
    if (id) {
      return api.get(`/post/${id}`).then(res => res.data);
    } else {
      return Promise.reject('Invalid access.');
    }
  }

  const { isLoading, data, isError, error } = useQuery(['post', id], () => fetchPost(), {
    staleTime: 2000,
  });
  console.log(data);

  return (
    <Container>
      <PostTop data={data} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
