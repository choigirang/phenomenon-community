import React from 'react';

import { InputType } from '@/types/type';

import styled from 'styled-components';

type EmailProps = {
  userMail: InputType;
  setUserMail: React.Dispatch<React.SetStateAction<InputType>>;
  inputAble: boolean;
  setInputAble: React.Dispatch<React.SetStateAction<boolean>>;
};

const options: InputType = {
  google: 'google.com',
  hanmail: 'hanmail.com',
  hotmail: 'hatmail.com',
  daum: 'daum.com',
  kakao: 'kakao.com',
  yahoo: 'yahoo.com',
  nate: 'nate.com',
  user: '직접 입력',
};

/**
 * @param userMail 유저 메일
 * @param setUserMail 유저 메일 변경
 * @param inputAble 이메일 직접 작성에 따른 이메일 작성 boolean
 * @param setInputAble 이메일 작성 on/off
 * sign page에서 사용될 이메일 작성
 */
export default function Email({ userMail, setUserMail, inputAble, setInputAble }: EmailProps) {
  // 이메일 입력 이벤트
  const mailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'mail') {
      setUserMail(prev => ({
        ...prev,
        mail: value,
      }));
    } else {
      setUserMail(prev => ({
        ...prev,
        domain: value,
      }));
    }
  };

  // select 이벤트
  const selectDirect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    function domainHandler(value: string) {
      if (value === '직접 입력') {
        setUserMail(prev => ({ ...prev, domain: '' }));
        setInputAble(true);
      } else {
        setUserMail(prev => ({ ...prev, domain: value }));
        setInputAble(false);
      }
    }
    domainHandler(value);
  };
  return (
    <EmailContainer className="each-data">
      <Label htmlFor="mail" className="sub-title">
        이메일
      </Label>
      <EmailBox>
        <EmailInput>
          {/* 이메일 주소 */}
          <input type="text" onChange={mailHandler} name="mail" required />
          <span className="at">@</span>
          <input
            id="url"
            name="domain"
            value={userMail.domain}
            type="text"
            onChange={mailHandler}
            required
            disabled={!inputAble}
          />
          {/* 도메인 선택 */}
          <Select name="domain" value={userMail.domain} onChange={selectDirect}>
            <option defaultValue="" value="">
              이메일 선택
            </option>
            {Object.keys(options).map(opt => (
              <option value={options[opt]} key={options[opt]}>
                {options[opt]}
              </option>
            ))}
          </Select>
        </EmailInput>
        <TextBox>
          <li>보안 코드는 식별 코드 찾기/비밀번호 재설정 및 탈퇴 시 사용되므로 발급을 부탁드립니다.</li>
          <li>인증 코드 발송 후 코드를 입력해 주시기 부탁드립니다.</li>
          <li>
            발급된 인증 코드는 개인 정보 보호를 위해 5분간만 유효합니다. 유효 시간이 경과할 경우 재발급을 받아주시기
            바랍니다.
          </li>
        </TextBox>
      </EmailBox>
    </EmailContainer>
  );
}

const EmailContainer = styled.div`
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

const EmailBox = styled.div``;

const EmailInput = styled.div`
  margin-bottom: var(--margin-solo);
`;

const TextBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: var(--padding-solo);

  li {
    font-size: var(--size-text);
    color: var(--color-gray);

    :before {
      content: '- ';
    }
  }

  .at {
    margin: 0 var(--padding-solo);
  }
`;

const Select = styled.select`
  width: 150px;
  height: 30px;
  padding-left: var(--padding-solo);
  margin-left: var(--margin-solo);
  border: solid 1px var(--color-light-gray);
  background-color: var(--color-dark-white);
`;
