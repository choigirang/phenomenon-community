import React, { useEffect, useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/router';

import SignHeader from '@/components/Sign/SignHeader';
import SignProgress from '@/components/Sign/SignProgress';
import { api } from '@/util/api';

import styled from 'styled-components';
import { Bottom, NextPage } from '@/styles/GlobalComponents';
import { AiFillCheckCircle } from 'react-icons/ai';
import { headers } from 'next/dist/client/components/headers';
import { AxiosSecurityCode, CheckId, CheckName, CheckSecurityType, InputType, ValidationItem } from '@/types/type';
import Password from '@/components/Sign/Password';
import Id from '@/components/Sign/Id';
import NickName from '@/components/Sign/NickName';
import ImageSelect from '@/components/Sign/ImageSelect';
import Email from '@/components/Sign/Email';
import SecurityCode from '@/components/Sign/SecurityCode';

export default function Info() {
  const router = useRouter();
  // 이미지
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // 아이디
  const [id, setId] = useState<CheckId>({
    userId: '',
    required: false,
  });

  // 비밀번호
  const [checkPass, setCheckPass] = useState<InputType>({
    firstPass: '',
    secondPass: '',
  });

  //  비밀번호 일치 검사
  const [validatePass, setValidatePass] = useState(false);

  // 닉네임 유효성 검사
  const [nickname, setNickName] = useState<CheckName>({
    name: '',
    checkName: false,
  });

  //  이메일 관리
  const [userMail, setUserMail] = useState<InputType>({
    mail: '',
    domain: '',
  });
  const [inputAble, setInputAble] = useState<boolean>(false);

  // 보안 코드 관리
  const [security, setSecurity] = useState<AxiosSecurityCode>({
    code: '',
    userCode: '',
  });
  const [checkSecurity, setCheckSecurity] = useState<CheckSecurityType>({
    agree: false,
    compareSecurityCode: false,
    errInfo: '',
    errCode: '',
  });

  // 유효성 검사
  const validationItems: ValidationItem[] = [
    {
      name: '대문자',
      check: (data: string) => /[A-Z]/.test(data),
    },
    {
      name: '소문자',
      check: (data: string) => /[a-z]/.test(data),
    },
    {
      name: '특수문자',
      check: (data: string) => /[!@#$%^&*()\-=+{}[\]:;'",.<>?/|\\]/.test(data),
    },
    {
      name: '숫자',
      check: (data: string) => /\d/.test(data),
    },
    {
      name: '한글',
      check: (data: string) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(data),
    },
  ];

  // 메일 확인과 수집 동의 확인
  const checkMailOpt = userMail.mail !== '' && userMail.domain !== '' && checkSecurity.agree;

  //  제출
  const agreementCheck = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // 이미지를 추가
    if (selectedImage) {
      formData.append('profileImage', selectedImage);
    } else {
      formData.append('profileImage', 'default');
    }

    // 다른 입력 데이터 추가
    formData.append('id', id.userId);
    formData.append('password', checkPass.secondPass);
    formData.append('name', nickname.name);
    formData.append('mail', `${userMail.mail}@${userMail.domain}`);

    const signIn = () =>
      api
        .post('/signup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          alert('회원가입이 완료되었습니다.');
        })
        .catch(err => console.log(err));

    console.log(formData);
    // if (checkSecurity.compareSecurityCode) {
    signIn();
    return router.push('/signup/complete');
    // } else alert('회원 가입에 실패했습니다. 다시 진행해주세요.');
  };

  return (
    <>
      <SignHeader />
      <SignProgress />
      <Bottom onSubmit={agreementCheck} method="post" encType="multipart/form-data">
        <InputContainer>
          <div className="title">기본 정보 입력</div>
          <InputBox>
            {/* 이미지 */}
            <ImageSelect selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

            {/* 아이디 */}
            <Id id={id} setId={setId} validationItems={validationItems} />

            {/* 비밀번호 */}
            <Password
              checkPass={checkPass}
              setCheckPass={setCheckPass}
              validatePass={validatePass}
              setValidatePass={setValidatePass}
              validationItems={validationItems}
            />

            {/* 닉네임 */}
            <NickName nickName={nickname} setNickName={setNickName} />

            {/* 이메일 */}
            <Email userMail={userMail} setUserMail={setUserMail} inputAble={inputAble} setInputAble={setInputAble} />

            {/* 보안 코드 */}
            <SecurityCode
              security={security}
              setSecurity={setSecurity}
              checkSecurity={checkSecurity}
              setCheckSecurity={setCheckSecurity}
              checkMailOpt={checkMailOpt}
              userMail={userMail}
            />
          </InputBox>
        </InputContainer>
        <NextPage>
          <button className="btn" type="submit">
            다음
          </button>
        </NextPage>
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

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5% 10%;
  border: solid 1px var(--color-light-gray);
  border-radius: var(--border-radius-small);

  /* 공통 스타일 */
  input {
    height: 30px;
    border-radius: var(--border-radius-small);
    border: solid 1px var(--color-light-gray);
    padding: 0 var(--padding-solo);

    :focus {
      border: solid 2px var(--color-light-blue);
      /* 밀림 방지 */
      /* margin: -1; */
    }
  }

  /* 데이터 입력 */
  .each-data {
    width: 100%;
    padding: var(--padding-content);
    position: relative;
    display: grid;
    grid-template-columns: 20% 80%;

    .sub-title {
      font-size: var(--size-sub-title);
      font-weight: 500;
      line-height: 30px;
    }

    .on {
      color: green !important;
    }

    .line-box {
      display: flex;
      gap: 4px;
      padding: 2px;

      div {
        width: 100%;
        height: 3px;
        background-color: red;
      }
    }
  }
`;
