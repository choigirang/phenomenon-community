import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function index() {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.get('/users').then(res => setUsers(res.data));
  }, []);

  console.log(users);

  return <Container></Container>;
}

const Container = styled.div``;
