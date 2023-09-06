import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import Logo from '@/components/Common/Logo';
import { HEADER_NAV } from '@/constant/constant';

import styled from 'styled-components';

export default function SignHeader() {
  const router = useRouter();

  // Header 카테고리
  const category = useMemo(() => Object.keys(HEADER_NAV), []);

  return (
    <Top>
      {/* <Logo /> */}
      <Category>
        {category.map(each => (
          <li key={HEADER_NAV[each]} className="nav-item">
            <a onClick={() => router.push(HEADER_NAV[each])}>{each}</a>
          </li>
        ))}
      </Category>
    </Top>
  );
}

// 카테고리 및 로고
const Top = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-blue);
  padding: var(--padding-base);
  color: white;
`;

const Category = styled.ul`
  display: flex;
  gap: 8px;
  font-size: 12px;
`;
