import { OptionBox } from '@/components/Login';
import { HEADER_NAV, PRIVATE_TEXT, SERVICE_TEXT } from '@/constant/constant';
import { NextPage } from '@/styles/GlobalComponents';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

export default function index() {
  // Header 카테고리
  const category = useMemo(() => Object.keys(HEADER_NAV), []);

  // 필수 동의
  const [useCheck, setUseCheck] = useState<boolean>(false);
  const [privateCheck, setPrivateCheck] = useState<boolean>(false);

  // 링크
  const router = useRouter();

  // 다음 페이지
  const agreementCheck = () => {
    if (!useCheck || !privateCheck) return alert('필수 항목에 동의해야 합니다.');
    return router.push('/signup/info');
  };
  return (
    <>
      {/* 상단 카테고리 */}
      <Top>
        <div className="logo" onClick={() => router.push('/')}>
          logo
        </div>
        <Category>
          {category.map(each => (
            <li key={HEADER_NAV[each]} className="nav-item">
              <a onClick={() => router.push(HEADER_NAV[each])}>{each}</a>
            </li>
          ))}
        </Category>
      </Top>
      {/* 회원가입 */}
      <Bottom>
        <ServiceAgree>
          <span className="example">· 이용약관동의 예시입니다.</span>
          <pre className="content-text">{SERVICE_TEXT}</pre>
          <AgreeBox>
            <input type="checkbox" checked={useCheck} onChange={() => setUseCheck(!useCheck)} required />
            <span>[필수] 내용을 확인했으며, 동의합니다.</span>
          </AgreeBox>
        </ServiceAgree>

        <ServiceAgree>
          <span className="example">· 개인정보처리방침 예시입니다.</span>
          <pre className="content-text">{PRIVATE_TEXT}</pre>
          <AgreeBox>
            <input type="checkbox" checked={privateCheck} onChange={() => setPrivateCheck(!privateCheck)} required />
            <span>[필수] 내용을 확인했으며, 동의합니다.</span>
          </AgreeBox>
        </ServiceAgree>
        <NextPage>
          <button className="btn" onClick={() => agreementCheck()}>
            다음
          </button>
        </NextPage>
      </Bottom>
    </>
  );
}
// 카테고리 및 로고
export const Top = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-blue);
  padding: var(--padding-base);
  color: white;
`;

export const Category = styled.ul`
  display: flex;
  gap: 8px;
  font-size: 12px;
`;

// 회원가입 부분
const Bottom = styled.div`
  width: 100%;
  padding: var(--padding-base);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--padding-side);
`;

const ServiceAgree = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  font-size: var(--size-text);

  .example {
    font-size: var(--size-sub-title);
    font-weight: 500;
    color: var(--color-dark-red);
  }

  .content-text {
    height: 300px;
    border: var(--border-content);
    padding: var(--padding-side);
    overflow: scroll;
    white-space: pre-wrap;
    line-height: 20px;

    ::-webkit-scrollbar {
      width: 8px;
      height: 0;
    }

    ::-webkit-scrollbar-track {
      background-color: rgba(56, 52, 52, 0.243);
    }

    ::-webkit-scrollbar-thumb {
      background-color: #ff6b6b;
      border-radius: 4px;
    }
  }
`;

const AgreeBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 10px;
  font-weight: 500;
`;
