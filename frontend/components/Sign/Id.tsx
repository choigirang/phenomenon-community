import { CheckId, ValidationItem } from '@/types/type';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type IdProps = {
  id: CheckId;
  setId: React.Dispatch<React.SetStateAction<CheckId>>;
  validationItems: ValidationItem[];
};

interface IdValidate {
  length: boolean;
  word: boolean;
}

type StyleProps = {
  validate: IdValidate;
};

export default function Id({ id, setId, validationItems }: IdProps) {
  const [checkId, setCheckId] = useState<IdValidate>({
    length: false,
    word: false,
  });

  // 아이디 유효성 확인
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

      <InputBox validate={checkId}>
        <input
          id="id"
          name="userId"
          type="text"
          placeholder="특수문자를 제외한 2글자 이상 20글자 이하의 문자"
          onChange={checkIdHandler}
          required
        />
        <button>중복검사</button>
      </InputBox>
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

const InputBox = styled.div<StyleProps>`
  display: flex;
  gap: 10px;

  button {
    width: 100px;

    &:hover {
      background-color: var(--color-light-gray);
    }
  }

  input {
    width: 100%;
    color: ${props => (!props.validate.length || !props.validate.word ? 'red' : 'black')};
  }
`;
