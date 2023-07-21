import { HEADER_NAV } from '@/constant/constant';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';

export default function index() {
  // Header 카테고리
  const category = useMemo(() => Object.keys(HEADER_NAV), []);

  // 링크
  const router = useRouter();

  return (
    <>
      <Top>
        <div className="logo" onClick={() => router.push('/')}>
          logo
        </div>
        <Category>
          {category.map(each => (
            <li key={HEADER_NAV[each]} className="nav-item">
              <a onClick={() => router.push(HEADER_NAV[each])}>{each}</a>
            </li>
          ))}
        </Category>
      </Top>
      <Bottom></Bottom>
    </>
  );
}

const Top = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-blue);
  color: white;
  padding: 0 calc(100% - 1280px);
`;

const Category = styled.ul`
  display: flex;
  gap: 8px;
  font-size: 12px;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
