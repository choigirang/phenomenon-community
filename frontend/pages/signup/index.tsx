import { OptionBox } from '@/components/Login';
import { HEADER_NAV, PRIVATE_TEXT, SERVICE_TEXT } from '@/constant/constant';
import { NextPage } from '@/styles/\bGlobalComponents';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';

export default function index() {
  // Header 카테고리
  const category = useMemo(() => Object.keys(HEADER_NAV), []);

  // 링크
  const router = useRouter();

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
            <input type="checkbox" />
            <span>내용을 확인했으며, 동의합니다.</span>
          </AgreeBox>
        </ServiceAgree>

        <ServiceAgree>
          <span className="example">· 개인정보처리방침 예시입니다.</span>
          <pre className="content-text">{PRIVATE_TEXT}</pre>
          <AgreeBox>
            <input type="checkbox" />
            <span>내용을 확인했으며, 동의합니다.</span>
          </AgreeBox>
        </ServiceAgree>
        <NextPage>
          <div className="btn">다음</div>
        </NextPage>
      </Bottom>
    </>
  );
}
// 카테고리 및 로고
const Top = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-blue);
  padding: var(--padding-base);
  color: white;
`;

const Category = styled.ul`
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
