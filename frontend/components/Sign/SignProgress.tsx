import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';

interface BoxProps {
  isActive: boolean;
}

interface ColorByLinkTypes {
  [key: string]: string;
}

export default function SignProgress() {
  const router = useRouter();
  const [curLink, setCurLink] = useState(router.pathname);
  const colorByLink: ColorByLinkTypes = {
    '/signup': '약관 동의',
    '/signup/info': '기본 정보 입력',
    '/signup/complete': '가입 완료',
  };

  useEffect(() => {
    setCurLink(router.pathname);
  }, [router.pathname]);

  return (
    <Container>
      {Object.keys(colorByLink).map(link => {
        return (
          <Box key={link}>
            <BoxChild isActive={router.pathname === link}>{colorByLink[link]}</BoxChild>
          </Box>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 100px;

  padding: var(--padding-base);
  display: flex;
  justify-content: space-around;
`;

// 진행 상황별 박스
const Box = styled.div`
  width: calc(100% / 3);
  height: 100%;
  position: relative;
  padding: var(--padding-side) 0;
`;

const BoxChild = styled.div<BoxProps>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isActive ? 'white' : 'var(--color-light-gray)')};
  color: ${props => (props.isActive ? 'var(--color-blue)' : 'var(--color-gray)')};
  font-weight: ${props => (props.isActive ? '500' : '')};
  font-size: var(--size-title);
  border: ${props => (props.isActive ? '3px solid var(--color-dark-blue)' : '')};
`;
