import React from 'react';
import styled from 'styled-components';

export default function LeftBox() {
  const category = ['임시'];

  const tem = Array(10).fill(category).flat();

  return (
    <Container>
      <CategoryBox>
        <Category>
          <p className="sub-title">전체보기</p>
          {tem.map(item => (
            <div>{item}</div>
          ))}
        </Category>
      </CategoryBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const CategoryBox = styled.div`
  width: 100%;
  height: 170px;
  padding: var(--padding-solo) 0;
`;

const Category = styled.div`
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
