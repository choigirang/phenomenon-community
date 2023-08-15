import React from 'react';
import styled from 'styled-components';

import Login from './Login';
import AddPostBtn from '../Community/AddPostBtn';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function RightBox() {
  const user = useSelector((state: RootState) => state.user.user);

  const loginState = user.login && user.name;
  return (
    <Container>
      <Login />
      {loginState && <AddPostBtn />}
    </Container>
  );
}

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: var(--padding-content);
`;
