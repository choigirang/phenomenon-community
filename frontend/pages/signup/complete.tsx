import SignHeader from '@/components/Sign/SignHeader';
import SignProgress from '@/components/Sign/SignProgress';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

export default function complete() {
  const router = useRouter();

  return (
    <>
      {/* 상단 */}
      <SignHeader />
      {/* 진행 단계 */}
      <SignProgress />
      {/* 홈으로 */}
      <Container>
        <p className="">회원가입이 완료되었습니다.</p>
        <button onClick={() => router.push('/')}>홈으로 이동</button>
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
