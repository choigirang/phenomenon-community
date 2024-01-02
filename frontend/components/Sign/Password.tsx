import { CheckPass, InputType, PassInputData, ValidationItem } from '@/types/type';
import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import styled from 'styled-components';

type PasswordProps = {
  checkPass: CheckPass;
  setCheckPass: React.Dispatch<React.SetStateAction<CheckPass>>;
};

export default function Password({ checkPass, setCheckPass }: PasswordProps) {
  const [pass, setPass] = useState({
    firstPass: '',
    secondPass: '',
    length: false,
    word: false,
    validation: false,
  });

  // 비밀번호 입력 이벤트
  const checkPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'firstPass') {
      setPass(prev => ({ ...prev, firstPass: value }));

      // 비밀번호 길이
      if (value.length >= 8 && value.length <= 20) setPass(prev => ({ ...prev, length: true }));
      else setPass(prev => ({ ...prev, length: false }));

      const check = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;

      // 비밀번호 유효성
      if (check.test(value)) setPass(prev => ({ ...prev, word: true }));
      else setPass(prev => ({ ...prev, word: false }));
    }

    if (name === 'secondPass') {
      setPass(prev => ({ ...prev, secondPass: value }));

      if (pass.firstPass === value) {
        setPass(prev => ({ ...prev, validation: true }));
        setCheckPass({ pass: value, required: true });
      } else {
        setPass(prev => ({ ...prev, validation: false }));
        setCheckPass(prev => ({ ...prev, required: false }));
      }
    }
  };

  return (
    <PassContainer>
      <Label htmlFor="pass">비밀번호</Label>
      <PassBox className="pass-box">
        <input
          id="pass"
          type="password"
          name="firstPass"
          placeholder="비밀번호를 입력해주세요."
          onChange={checkPassHandler}
          required
          autoComplete="new-password"
        />
        <input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          name="secondPass"
          onChange={checkPassHandler}
          required
          autoComplete="new-password"
        />
        <OptionBox>
          <TextBox>
            <SmallTitle>비밀번호 필수 조건</SmallTitle>
            <NeedOption word={pass.word} length={pass.length} validation={pass.validation}>
              <AiFillCheckCircle className="word" />
              <span className="word">대소문자, 숫자, 특수문자 조합이어야 합니다.</span>
            </NeedOption>
            <NeedOption>
              <AiFillCheckCircle className="length" />
              <span className="length">8 ~ 20 글자입니다.</span>
            </NeedOption>
            <NeedOption>
              <AiFillCheckCircle className="validation" />
              <span className="validation">1차,2차 비밀번호가 일치해야 합니다.</span>
            </NeedOption>
          </TextBox>
        </OptionBox>
      </PassBox>
    </PassContainer>
  );
}

const PassContainer = styled.div`
  width: 100%;
  padding: var(--padding-content);
  position: relative;
  display: grid;
  grid-template-columns: 20% 80%;
`;

const Label = styled.label`
  font-size: var(--size-sub-title);
  font-weight: 500;
  line-height: 30px;
`;

const PassBox = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OptionBox = styled.div`
  padding-top: var(--padding-solo);
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: var(--padding-solo);
`;

const SmallTitle = styled.span`
  font-size: var(--size-text);
  font-weight: 500;
`;

const NeedOption = styled.div<PassInputData>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-gray);
  font-size: var(--size-text);
`;
