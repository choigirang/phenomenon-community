import React from 'react';

import Login from '@/components/Common/Login';

import { Container } from '@/styles/GlobalComponents';
import styled from 'styled-components';

export default function index() {
  return (
    <Container>
      <CommunityContainer>
        <BestPost>
          <p className="sub-title">개념글</p>
        </BestPost>
      </CommunityContainer>
      <Login />
    </Container>
  );
}

const CommunityContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--padding-content);
  padding-left: 0;
`;

const BestPost = styled.div`
  width: 100%;

  .sub-title {
    border-bottom: var(--border-solid1) var(--color-blue);
  }
`;
