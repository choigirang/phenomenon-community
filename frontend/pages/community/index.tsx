import RightBox from '@/components/Common/RightBox';
import Login from '@/components/Common/Login';
import { Container } from '@/styles/GlobalComponents';
import React from 'react';
import styled from 'styled-components';

export default function index() {
  return (
    <Container>
      <CommunityContainer>
        <BestPost>
          <p className="sub-title">개념글</p>
        </BestPost>
      </CommunityContainer>
      <RightBox />
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
