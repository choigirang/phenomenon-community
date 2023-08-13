import React from 'react';
import styled from 'styled-components';

import Login from './../Login';
import AddPostBtn from '../Community/AddPostBtn';

export default function RightBox() {
  return (
    <Container>
      <Login />
      <AddPostBtn />
    </Container>
  );
}

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: var(--padding-content);
`;
