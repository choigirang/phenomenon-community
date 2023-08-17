import { Container } from '@/styles/GlobalComponents';
import React from 'react';
import Login from '@/components/Common/Login';
import PostShow from '@/components/Community/PostShow';

export default function index() {
  return (
    <Container>
      <PostShow />
      <Login />
    </Container>
  );
}
