import { HEADER_NAV } from '@/constant/constant';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';

export default function Header() {
  // Header 카테고리
  const category = useMemo(() => Object.keys(HEADER_NAV), []);
  // 링크 연결
  const router = useRouter();

  return (
    <Container>
      <div className="logo">logo</div>
      <Nav>
        {category.map(each => (
          <li key={HEADER_NAV[each]} className="nav-item">
            <a onClick={() => router.push(HEADER_NAV[each])}>{each}</a>
          </li>
        ))}
      </Nav>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 60px;
  position: relative;
  background: var(--color-blue);

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

const Nav = styled.ul`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;

  .nav-item {
    font-size: var(--size-title);
    padding: 0 20px;
  }
`;
