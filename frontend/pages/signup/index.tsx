import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { PRIVATE_TEXT, SERVICE_TEXT } from '@/constant/constant';

import { NextPage } from '@/styles/GlobalComponents';
import SignHeader from '@/components/Sign/SignHeader';
import SignProgress from '@/components/Sign/SignProgress';
import { Bottom } from '../../styles/GlobalComponents';

interface AgreementData {
  id: string;
  title: string;
  text: string;
  name: 'useCheck' | 'privateCheck';
}

const serviceData: AgreementData[] = [
  {
    id: 'check1',
    title: '· 이용약관동의 예시입니다.',
    text: SERVICE_TEXT,
    name: 'useCheck',
  },
  {
    id: 'check2',
    title: '· 개인정보처리방침 예시입니다.',
    text: PRIVATE_TEXT,
    name: 'privateCheck',
  },
];

export default function index() {
  // 필수 동의
  const [check, setCheck] = useState({
    useCheck: false,
    privateCheck: false,
  });

  // 링크
  const router = useRouter();

  // 필수 동의 상태 변경
  const handleCheckboxChange = (name: 'useCheck' | 'privateCheck') => {
    setCheck(prevCheck => ({ ...prevCheck, [name]: !prevCheck[name] }));
  };

  // 다음 페이지
  const agreementCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!check.useCheck || !check.privateCheck) return alert('필수 항목에 동의해야 합니다.');
    return router.push('/signup/info');
  };
  return (
    <>
      {/* 상단 */}
      <SignHeader />
      {/* 진행 단계 */}
      <SignProgress />
      {/* 회원가입 */}
      <Bottom>
        {serviceData.map(data => (
          <ServiceAgree key={data.id}>
            <span className="example">{data.title}</span>
            <pre className="content-text">{data.text}</pre>
            <AgreeBox>
              <input
                id={data.id}
                type="checkbox"
                checked={check[data.name]}
                onChange={() => handleCheckboxChange(data.name)}
                required
              />
              [필수] 내용을 확인했으며, 동의합니다.
            </AgreeBox>
          </ServiceAgree>
        ))}
        <NextPage>
          <button className="btn" onClick={e => agreementCheck(e)}>
            다음
          </button>
        </NextPage>
      </Bottom>
    </>
  );
}

// 회원가입 부분
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

// 체크 박스
const AgreeBox = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  font-weight: 500;
`;
