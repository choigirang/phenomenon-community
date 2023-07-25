import React from 'react';

import SignHeader from '@/components/Sign/SignHeader';
import SignProgress from '@/components/Sign/SignProgress';

import { Bottom } from '@/styles/GlobalComponents';
import styled from 'styled-components';

interface InputType {
  [key: string]: string;
}

const inputData: InputType = {
  아이디: '아이디',
  비밀번호: '비밀번호',
  닉네임: '닉네임',
  이메일: '이메일',
  자동입력방지: '자동 입력 방지 코드',
};

export default function info() {
  return (
    <>
      <SignHeader />
      <SignProgress />
      <Bottom>
        <InputContainer>
          <div className="title">기본 정보 입력</div>
          <InputBox>
            {Object.keys(inputData).map(title => (
              <div className="each-data" key={title}>
                <label>{inputData[title]}</label>
                <input type="text" required />
              </div>
            ))}
          </InputBox>
        </InputContainer>
      </Bottom>
    </>
  );
}

const InputContainer = styled.div`
  width: 100%;
  height: 100%;

  .title {
    font-size: var(--size-sub-title);
    font-weight: 500;
    color: var(--color-blue);
    padding: var(--padding-side) 0;
    margin-bottom: var(--margin-solo);
    border-bottom: solid 2px var(--color-blue);
  }
`;

const InputBox = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: var(--padding-content);
  border: solid 1px var(--color-gray);

  input {
    width: 100%;
    border: solid 1px var(--color-gray);
  }

  .each-input {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
  }
`;
