import React from 'react';
import styled from 'styled-components';

export default function index() {
  return (
    <>
      <Top>index</Top>
    </>
  );
}

const Top = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  background-color: var(--color-blue);
  color: white;
  padding: 0 calc(100% - 1280px);
`;

const Bottom = styled.div`
  width: 100%;
`;
