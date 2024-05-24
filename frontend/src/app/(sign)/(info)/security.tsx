'use client';

import React from 'react';
import { api } from '@/util/api';

import { AxiosSecurityCode, CheckSecurityType, InputType } from '@/type/sign/type';

type SecurityProps = {
  security: AxiosSecurityCode;
  setSecurity: React.Dispatch<React.SetStateAction<AxiosSecurityCode>>;
  checkSecurity: CheckSecurityType;
  setCheckSecurity: React.Dispatch<React.SetStateAction<CheckSecurityType>>;
  checkMailOpt: boolean;
  userMail: InputType;
};

/** 2024/05/23 - user securtity mail code(parent: infoPage) in sign page */
export default function Security({
  security,
  setSecurity,
  checkSecurity,
  setCheckSecurity,
  checkMailOpt,
  userMail,
}: SecurityProps) {
  // agreement email func
  const securityAgreeHandler = () => {
    setCheckSecurity(prev => ({
      ...prev,
      agree: !prev.agree,
    }));
  };

  // security code input func
  const userCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSecurity(prev => ({ ...prev, userCode: value }));
  };

  // send security code func
  const checkMailBeforeSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (checkMailOpt) {
      sendCodeHandler();
    } else {
      setCheckSecurity(prev => ({
        ...prev,
        errInfo: '수집 동의와 올바른 이메일 입력이 필요합니다.',
      }));
    }
  };

  // send security code api
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

  // check security code
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
    <React.Fragment>
      <div className="flex flex-col gap-2 text-xs bg-[#d1d1d1] p-default">
        <span className="font-bold">이메일 수집 동의</span>
        <div>
          <div className="flex gap-1">
            {/* agreement */}
            <input type="checkbox" id="agree" onClick={securityAgreeHandler} className="outline-none" />
            <label htmlFor="agree">
              입력하신 이메일은 인증 및 보안 코드 전송을 위해 사용하며, 이메일 발송 후 즉시 파기됩니다.
            </label>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          {/* security code input */}
          <input
            type="text"
            placeholder="인증 코드 입력"
            onChange={userCode}
            className="p-default border border-lightGray outline-none"
          />
          <button onClick={e => compareSecurityCode(e)} className="p-default bg-blue text-white">
            확인
          </button>
        </div>
        {/* send security code */}
        <button
          type="button"
          onClick={e => checkMailBeforeSend(e)}
          className="p-default text-blue font-bold border border-blue">
          인증 코드 받기
        </button>
      </div>
      {/* error msg */}
      <p>{checkSecurity.errInfo}</p>
      <p>{checkSecurity.errCode}</p>
    </React.Fragment>
  );
}
