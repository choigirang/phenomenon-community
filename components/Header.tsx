import React from 'react';
import styled from 'styled-components';

export default function Header() {
  const category = ['명예의 전당', '게시글', '공지사항'];

  return <Container>Header</Container>;
}

const Container = styled.div`
  width: 100vw;
  height: 60px;
  position: relative;
  background: gray;
`;
