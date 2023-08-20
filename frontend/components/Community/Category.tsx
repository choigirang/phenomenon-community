import { PostType } from '@/types/type';
import { api } from '@/util/api';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AiFillLeftSquare, AiFillRightSquare } from 'react-icons/ai';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import EachPost from './EachPost';

export default function Category() {
  // 카테고리 가져오기
  const categoryList = ['임시'];
  const tem = Array(30).fill(categoryList).flat();

  return (
    <Container>
      <CategoryBox>
        <CategoryAll>
          <p className="sub-title">전체보기</p>
          <CategoryList>
            {tem.map((item, idx) => (
              <CategoryItem key={idx}>
                <span>{item}</span>
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
  height: 100%;
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

  span:hover {
    cursor: pointer;
    border-bottom: var(--border-text);
    font-weight: 400;
  }
`;
