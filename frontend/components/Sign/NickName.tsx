import { CheckName } from '@/types/type';
import React, { useState } from 'react';
import styled from 'styled-components';

type NickNameProps = {
  nickName: CheckName;
  setNickName: React.Dispatch<React.SetStateAction<CheckName>>;
};

export default function NickName({ nickName, setNickName }: NickNameProps) {
  const nicknameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // function checkCondition(value: string) {
    //   return (
    //     validationItems.some(item => item.name === '숫자' && item.check(value)) &&
    //     validationItems.some(item => item.name === '한글' && item.check(value))
    //   );
    // }

    // if (checkCondition(value))
    //   setNickName(prevState => ({
    //     ...prevState,
    //     name: value,
    //   }));

    setNickName(prev => ({
      ...prev,
      name: value,
    }));
  };

  return (
    <NickNameContainer>
      <Label htmlFor="name">닉네임</Label>
      <NameBox>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="닉네임을 입력해주세요."
          onChange={nicknameHandler}
          required
        />
        <span>{`${'2~20자의 닉네임을 입력해주세요.(띄어쓰기는 허용되지 않습니다.)'}`}</span>
      </NameBox>
    </NickNameContainer>
  );
}

const NickNameContainer = styled.div`
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

const NameBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    padding-top: var(--padding-solo);
    font-size: var(--size-text);
    // color: ${props => (props ? 'var(--color-gray)' : 'var(--color-red)')};
  }
`;
