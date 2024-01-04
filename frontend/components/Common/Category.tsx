import React, { useMemo } from 'react';
import Link from 'next/link';

import { CATEGORY } from '@/constant/constant';

import styled from 'styled-components';

/** Nav 카테고리 */
export default function Category() {
  // 카테고리 가져오기
  const category = useMemo(() => Object.keys(CATEGORY), []);

  return (
    <Container>
      <CategoryBox>
        <CategoryAll>
          <p className="sub-title">카테고리</p>
          <CategoryList>
            {category.map((item, idx) => (
              <CategoryItem key={idx}>
                <Link href={item === '전체' ? '/community' : `/community?category=${CATEGORY[item]}`}>{item}</Link>
              </CategoryItem>
            ))}
          </CategoryList>
        </CategoryAll>
      </CategoryBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

// 카테고리 상자
const CategoryBox = styled.div`
  width: 100%;
  height: 170px;
  padding: var(--padding-solo) 0;
`;

const CategoryAll = styled.div`
  width: 100%;
  height: 100%;
  border: var(--border-content);
  padding: var(--padding-content);

  .sub-title {
    width: 100%;
    font-weight: 500;
    font-size: 12px;
    padding-bottom: var(--padding-solo);
    border-bottom: var(--border-dash);
  }
`;

// 카테고리 목록
const CategoryList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const CategoryItem = styled.li`
  padding: var(--padding-content);
  padding-left: 0;
  font-size: var(--size-text);

  a:hover {
    cursor: pointer;
    border-bottom: var(--border-text);
    font-weight: 400;
  }
`;
