import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return <Container></Container>;
}

const Container = styled.div`
  width: 100%;
  height: 200px;
  padding: 0 calc((100% - 1280px) / 2);
  background-color: var(--color-blue);
  color: white;
  margin-top: 50px;
`;
