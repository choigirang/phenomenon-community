import React from 'react';

import { api } from '@/util/api';
import { AxiosSecurityCode, CheckSecurityType, InputType } from '@/types/type';

import styled from 'styled-components';

type SecurityProps = {
  security: AxiosSecurityCode;
  setSecurity: React.Dispatch<React.SetStateAction<AxiosSecurityCode>>;
  checkSecurity: CheckSecurityType;
  setCheckSecurity: React.Dispatch<React.SetStateAction<CheckSecurityType>>;
  checkMailOpt: boolean;
  userMail: InputType;
};

/**
 *
 * @param security 서버에서 전송된 코드와 유저가 작성한 코드
 * @param setSecurity
 * @param checkSecurity 코드 일치 여부
 * @param setCheckSecurity
 * @param checkMailOpt 이메일 동의 여부
 * @param userMail 작성한 유저 이메일
 * @returns sign page 에서 사용될 보안코드 일치 여부
 */
export default function SecurityCode({
  security,
  setSecurity,
  checkSecurity,
  setCheckSecurity,
  checkMailOpt,
  userMail,
}: SecurityProps) {
  // 이메일 수집 동의
  const securityAgreeHandler = () => {
    setCheckSecurity(prev => ({
      ...prev,
      agree: !prev.agree,
    }));
  };

  // 보안 코드 입력
  const userCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSecurity(prev => ({ ...prev, userCode: value }));
  };

  // 보안 코드 전송 메일 확인

  const checkMailBeforeSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (checkMailOpt) {
      sendCodeHandler();
    } else {
      setCheckSecurity(prev => ({
        ...prev,
        errInfo: '수집 동의와 올바른 이메일 입력이 필요합니다.',
      }));
      alert(checkSecurity.errInfo);
    }
  };

  // 보안 코드 전송
  const sendCodeHandler = () => {
    api
      .post('/signup/security-code', userMail)
      .then(res => {
        alert('보안 코드가 전송되었습니다.');
        setSecurity(prev => ({
          ...prev,
          code: res.data.toString(),
        }));
      })
      .catch(err => console.log(err));
  };

  // 보안 코드 확인
  const compareSecurityCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (security.code !== '' && security.code !== security.userCode) {
      alert('보안 코드를 확인해주세요.');
      setCheckSecurity(prev => ({
        ...prev,
        compareSecurityCode: false,
      }));
      console.log(security.code, security.userCode);
    } else {
      alert('보안 코드 확인이 완료되었습니다.');
      setCheckSecurity(prev => ({
        ...prev,
        compareSecurityCode: true,
      }));
    }
  };

  return (
    <div className="mail-agree">
      <AgreeBox>
        <SmallTitle>이메일 수집 동의</SmallTitle>
        <CheckInfo className="check-info">
          {/* 이메일 수집 동의 */}
          <input type="checkbox" id="agree" onClick={securityAgreeHandler} />
          <label htmlFor="agree">
            입력하신 이메일은 인증 및 보안 코드 전송을 위해 사용하며, 이메일 발송 후 즉시 파기됩니다.
          </label>
        </CheckInfo>
      </AgreeBox>
      <SecurityCheck>
        <SecurityInputBox>
          {/* 인증 코드 확인 */}
          <input type="text" placeholder="인증 코드 입력" onChange={userCode} />
          <button onClick={e => compareSecurityCode(e)}>확인</button>
        </SecurityInputBox>
        {/* 인증 코드 전송 */}
        <SendCodeBtm onClick={e => checkMailBeforeSend(e)}>인증 코드 받기</SendCodeBtm>
      </SecurityCheck>
      <ErrCode>{checkSecurity.errInfo}</ErrCode>
      <ErrCode>{checkSecurity.errCode}</ErrCode>
    </div>
  );
}

const AgreeBox = styled.div`
  width: 100%;
  background-color: var(--color-light-gray);
  padding: var(--padding-solo) var(--padding-side);
`;

const SmallTitle = styled.span`
  font-size: var(--size-text);
  font-weight: 500;
`;

const CheckInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--size-text);
`;

const SecurityCheck = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: var(--padding-solo);
`;

const SecurityInputBox = styled.div`
  float: left;
  border: var(--border-solid1) var(--color-blue);

  input {
    width: 145px;
    border: none;
    padding: var(--padding-solo);
    line-height: 33px;
  }

  button {
    width: 50px;
    height: 33px;
    font-weight: bold;
    text-shadow: 0px -1px var(--color-dark-blue);
    color: var(--color-white);
    background: var(--color-blue);
  }
`;

const SendCodeBtm = styled.button`
  font-weight: bold;
  height: 33px;
  padding: 0 var(--padding-solo);
  border: var(--border-solid1) var(--color-blue);
  background: white;
  color: var(--color-blue);
`;

const ErrCode = styled.p`
  font-size: var(--size-text);
  padding-top: var(--padding-solo);
`;
