import { api } from '@/util/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { PostType } from '@/types/type';
import { usePostDetail } from '@/hooks/usePostDetail';

export default function PostDetail({ id }: { id: number }) {
  const queryResult = usePostDetail(id);

  console.log(queryResult);

  if (queryResult.isLoading) {
    return <div>Loading...</div>;
  }

  if (queryResult.isError) {
    const error = queryResult.error as Error;
    return <div>Error: {error.message}</div>;
  }

  if (!queryResult.data) {
    return <div>No data available</div>;
  }

  const data: PostType = queryResult.data;

  console.log(data);

  return <Container></Container>;
}

const Container = styled.div`
  width: 100%;
`;
