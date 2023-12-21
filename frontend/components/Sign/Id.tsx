import { CheckId, ValidationItem } from '@/types/type';
import React, { useState } from 'react';
import styled from 'styled-components';

type IdProps = {
  id: CheckId;
  setId: React.Dispatch<React.SetStateAction<CheckId>>;
  validationItems: ValidationItem[];
};

export default function Id({ id, setId, validationItems }: IdProps) {
  const checkIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // 아이디 길이 확인
    const valueLength = value.length >= 2 && value.length <= 20;

    // 아이디 특수문자 확인
    function checkChar(value: string) {
      return validationItems.every(item => item.name !== '특수문자' || !item.check(value));
    }

    if (checkChar(value) && valueLength) {
      setId(prev => ({
        ...prev,
        userId: value,
      }));
    } else {
      setId(prev => ({ ...prev, required: false }));
    }
  };
  return (
    <IdContainer>
      <Label htmlFor="id">아이디</Label>
      <input
        id="id"
        name="userId"
        type="text"
        placeholder="아이디를 입력해주세요."
        onChange={checkIdHandler}
        required></input>
    </IdContainer>
  );
}

const IdContainer = styled.div`
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
