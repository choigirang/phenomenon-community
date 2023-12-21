import { InputType, PassInputData, ValidationItem } from '@/types/type';
import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import styled from 'styled-components';

type PasswordProps = {
  checkPass: InputType;
  setCheckPass: React.Dispatch<React.SetStateAction<InputType>>;
  validatePass: boolean;
  setValidatePass: React.Dispatch<React.SetStateAction<boolean>>;
  validationItems: ValidationItem[];
};

export default function Password({
  checkPass,
  setCheckPass,
  validatePass,
  setValidatePass,
  validationItems,
}: PasswordProps) {
  // 2차 비밀번호
  const confirmPass = checkPass.firstPass === checkPass.secondPass;
  const passLength = checkPass.secondPass.length >= 2 && checkPass.secondPass.length <= 20;

  // 비밀번호 입력 이벤트
  const checkPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const valueLength = value.length >= 2 && value.length <= 20;

    function checkKor(value: string) {
      return validationItems.every(item => item.name !== '한글' || !item.check(value));
    }

    if (checkKor(value) && valueLength) {
      setCheckPass(prevCheckPass => ({
        ...prevCheckPass,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (confirmPass && passLength) setValidatePass(true);
    else setValidatePass(false);
  }, [checkPass.secondPass, confirmPass, passLength]);

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
        />
        <input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          name="secondPass"
          onChange={checkPassHandler}
          required
        />
        {!confirmPass && <ConfirmPass>입력한 비밀번호가 일치하지 않습니다.</ConfirmPass>}
        <OptionBox>
          <TextBox>
            <SmallTitle>비밀번호 필수 조건</SmallTitle>
            <NeedOption validatePass={validatePass} leastPass={confirmPass && checkPass.secondPass.length >= 8}>
              <AiFillCheckCircle />
              <span>영문 대소문자, 숫자, 특수문자 조합이어야 합니다.</span>
            </NeedOption>
            <NeedOption validatePass={validatePass} leastPass={confirmPass && checkPass.secondPass.length >= 8}>
              <AiFillCheckCircle />
              <span>8 ~ 20 글자입니다..</span>
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

const ConfirmPass = styled.span`
  font-size: var(--size-text);
  color: var(--color-red);
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
  color: var(-color-dark-white);

  svg {
    font-size: 12px;

    :nth-child(1) {
      color: ${props => (props.validatePass ? 'var(--color-green)' : 'var(--color-gray)')};
    }

    :nth-child(2) {
      color: ${props => (props.leastPass ? 'var(--color-green)' : 'var(--color-gray)')};
    }
  }

  span {
    font-size: var(--size-text);

    :nth-child(1) {
      color: ${props => (props.validatePass ? 'var(--color-green)' : 'var(--color-gray)')};
    }

    :nth-child(2) {
      color: ${props => (props.leastPass ? 'var(--color-green)' : 'var(--color-gray)')};
    }
  }
`;
