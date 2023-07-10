import React from 'react';
import styled from 'styled-components';
import Login from './Login';

export default function RightBox() {
  return (
    <Container>
      <Login></Login>
    </Container>
  );
}

const Container = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
`;
