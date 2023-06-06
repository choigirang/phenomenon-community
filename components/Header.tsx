import React from 'react';
import styled from 'styled-components';

export default function Header() {
  const category = ['명예의 전당', '게시글', '공지사항'];

  return (
    <Container>
      <div className="logo">logo</div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 60px;
  position: relative;
  background: gray;

  .logo {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 200px;
    height: 30px;
    background: white;
  }
`;
