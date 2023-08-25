import React from 'react';
import styled from 'styled-components';

export default function ListDivision() {
  return (
    <Container>
      <p className="number">번호</p>
      <p className="title">제목</p>
      <p className="date">날짜</p>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px auto 100px;
  font-size: var(--size-sub-title);
  font-weight: 400;
  border: var(--border-solid1) var(--color-dark-blue);
  background-color: var(--color-dark-white);

  p {
    text-align: center;
    position: relative;
    padding: var(--padding-content);

    &::after {
      content: '';
      position: absolute; /* 절대적 위치 설정 */
      top: 0;
      right: 0; /* 각 열의 오른쪽 끝에 배치 */
      width: var(--border-width); /* border의 너비 */
      height: 100%; /* 열의 높이와 같도록 설정 */
      border-right: var(--border-solid1) var(--color-dark-blue);
    }
    &:last-child::after {
      content: none;
    }
  }
`;
