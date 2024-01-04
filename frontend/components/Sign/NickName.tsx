import React from 'react';

import { api } from '@/util/api';
import { CheckName } from '@/types/type';

import styled from 'styled-components';

type NickNameProps = {
  nickName: CheckName;
  setNickName: React.Dispatch<React.SetStateAction<CheckName>>;
};

/**
 *
 * @param nickName 작성한 닉네임
 * @param setNickName 닉네임 변경
 * @returns sign page에서 사용될 닉네임 유효성 검사와 저장
 */
export default function NickName({ nickName, setNickName }: NickNameProps) {
  /** 닉네임 변경 핸들러 */
  const nicknameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setNickName(prev => ({
      ...prev,
      name: value,
    }));
  };

  /** 닉네임 중복 검사 핸들러 */
  const checkDuplicateNickName = () => {
    api
      .get(`/check?nickName=${nickName}`)
      .then(res => {
        alert('사용할 수 있는 닉네임입니다.');
        setNickName(prev => ({ ...prev, checkName: true }));
      })
      .catch(err => alert('사용할 수 없는 아이디입니다.'));
  };

  return (
    <NickNameContainer>
      <Label htmlFor="name">닉네임</Label>
      <NameBox>
        <InputBox>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="닉네임을 입력해주세요."
            onChange={nicknameHandler}
            required
          />
          <button onClick={checkDuplicateNickName}>중복검사</button>
        </InputBox>
        <span>{`${'특수문자 및 공백을 제외한 2~20자의 닉네임을 입력해주세요.'}`}</span>
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
    color: ${props => (props ? 'var(--color-gray)' : 'var(--color-red)')};
  }
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;

  input {
    width: 100%;
  }

  button {
    width: 100px;

    &:hover {
      background-color: var(--color-light-gray);
    }
  }
`;
