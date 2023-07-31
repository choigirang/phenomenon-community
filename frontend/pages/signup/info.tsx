import React, { ReactEventHandler, useEffect, useState } from 'react';

import SignHeader from '@/components/Sign/SignHeader';
import SignProgress from '@/components/Sign/SignProgress';

import { Bottom, NextPage } from '@/styles/GlobalComponents';
import styled from 'styled-components';
import { AiFillCheckCircle, AiFillQuestionCircle } from 'react-icons/ai';

interface InputType {
  [key: string]: string;
}

interface CheckData {
  [key: string]: boolean;
}

type IdCheck = {
  userId: string;
  required?: boolean;
};

type InputData = {
  validatePass: boolean;
  leastPass: boolean;
  leastNickname: boolean;
};

const options: InputType = {
  google: 'google',
  hanmail: 'hanmail',
  hotmail: 'hanmail',
  daum: 'daum',
  kakao: 'kakao',
  yahoo: 'yahoo',
  nate: 'nate',
  user: '직접 입력',
};

export default function info() {
  // 아이디
  const [id, setId] = useState<IdCheck>({
    userId: '',
    required: false,
  });

  // 비밀번호
  const [checkPass, setCheckPass] = useState<InputType>({
    firstPass: '',
    secondPass: '',
  });
  const [validatePass, setValidatePass] = useState<boolean>(false);

  // 유효성 검사
  function checkInput(userData: string) {
    const upperCase = /[A-Z]/.test(userData);
    const lowerCase = /[a-z]/.test(userData);
    const digit = /|d/.test(userData);
    const specialChar = /[!@#$%^&*()\-_=+{}[\]:;'",.<>?/|\\]/.test(userData);
    const koreanStr = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(userData);

    console.log(upperCase);

    return upperCase && lowerCase && digit && specialChar && koreanStr;
  }

  // 아이디 입력 이벤트
  const checkIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setId(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  // 비밀번호 유효성 검사
  const confirmPass = checkPass.firstPass === checkPass.secondPass;

  // 비밀번호 입력 이벤트
  const checkPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCheckPass(prevCheckPass => ({
      ...prevCheckPass,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (confirmPass && checkInput(checkPass.secondPass)) {
      setValidatePass(true);
    } else {
      setValidatePass(false);
    }
    console.log(validatePass, checkPass.secondPass, checkPass.firstPass);
  }, [confirmPass, checkPass.secondPass]);

  // 닉네임 유효성 검사
  const [nickname, setNickName] = useState<string>();
  const [checkNick, setCheckNick] = useState<boolean>(true);

  const nicknameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;

    if (target.length > 2 && target.length < 20) {
      setCheckNick(true);
      setNickName(target);
    } else {
      setCheckNick(false);
      setNickName('');
    }

    console.log(target, checkNick);
  };

  //  이메일 관리
  const [userMail, setUserMail] = useState<string>('');
  const [domain, setDomain] = useState<string>('');

  const domainHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'user') {
      setDomain('');
    } else {
      setDomain(`${event.target.value}.com`);
    }
  };

  //  제출
  const agreementCheck = () => {};
  return (
    <>
      <SignHeader />
      <SignProgress />
      <Bottom>
        <InputContainer>
          <div className="title">기본 정보 입력</div>
          <InputBox
            validatePass={validatePass}
            leastPass={confirmPass && checkPass.secondPass.length >= 8}
            leastNickname={checkNick}>
            {/* 아이디 */}
            <div className="each-data">
              <label htmlFor="id" className="sub-title">
                아이디
              </label>
              <input id="id" type="text" placeholder="아이디를 입력해주세요." required></input>
            </div>

            {/* 비밀번호 */}
            <div className="each-data">
              <label htmlFor="pass" className="sub-title">
                비밀번호
              </label>
              <div className="pass-box">
                <input
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
                {!confirmPass && <span className="confirm-pass">입력한 비밀번호가 일치하지 않습니다.</span>}
                <div className="opt-box">
                  <div className="text-box">
                    <span className="small-title">비밀번호 필수 조건</span>
                    <div className="need-opt">
                      <AiFillCheckCircle />
                      <span>영문 대소문자, 숫자, 특수문자 조합이어야 합니다.</span>
                    </div>
                    <div className="need-opt">
                      <AiFillCheckCircle />
                      <span>8 ~ 20 글자입니다..</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 닉네임 */}
            <div className="each-data">
              <label htmlFor="name" className="sub-title">
                닉네임
              </label>
              <div className="name-box">
                <input id="name" type="text" placeholder="닉네임을 입력해주세요." onChange={nicknameHandler} required />
                <span>{`${'2~20자의 닉네임을 입력해주세요.(띄어쓰기는 허용되지 않습니다.)'}`}</span>
              </div>
            </div>

            {/* 이메일 */}
            <div className="each-data">
              <label htmlFor="mail" className="sub-title">
                이메일
              </label>
              <div className="mail-box">
                <div className="mail-input">
                  <input id="mail" type="text" onChange={e => setUserMail(e.target.value)} required />
                  <span className="at">@</span>
                  <input id="url" type="text" value={domain} onChange={e => setDomain(e.target.value)} required></input>
                  <select name="fruits" className="select" onChange={domainHandler} value={domain}>
                    <option disabled value="">
                      이메일 선택
                    </option>
                    {Object.keys(options).map(opt => (
                      <option value={opt}>{options[opt]}</option>
                    ))}
                  </select>
                </div>
                <ul className="text-box">
                  <li>보안 코드는 식별 코드 찾기/비밀번호 재설정 및 탈퇴 시 사용되므로 발급을 부탁드립니다.</li>
                  <li>인증 코드 발송 후 코드를 입력해 주시기 부탁드립니다.</li>
                  <li>
                    발급된 인증 코드는 개인 정보 보호를 위해 5분간만 유효합니다. 유효 시간이 경과할 경우 재발급을
                    받아주시기 바랍니다.
                  </li>
                </ul>

                <div className="mail-agree">
                  <span className="small-title">이메일 수집 동의</span>
                  <div className="check-info">
                    <input type="checkbox" />
                    입력하신 이메일은 인증 및 보안 코드 전송을 위해 사용하며, 이메일 발송 후 즉시 파기됩니다.
                  </div>
                </div>
              </div>
            </div>
          </InputBox>
        </InputContainer>
        <NextPage>
          <button className="btn" onClick={() => agreementCheck()}>
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

const InputBox = styled.form<InputData>`
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

    .small-title {
      font-size: var(--size-text);
      font-weight: 500;
    }

    /* 비밀번호 스타일 */
    .pass-box {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .confirm-pass {
      font-size: var(--size-text);
      color: var(--color-red);
    }

    /* 비밀번호 추가조건 */
    .opt-box {
      padding-top: var(--padding-solo);
    }

    .text-box {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: var(--padding-solo);
    }
    .need-opt {
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

    /* 닉네임 */
    .name-box {
      display: flex;
      flex-direction: column;

      span {
        padding-top: var(--padding-solo);
        font-size: var(--size-text);
        color: ${props => (props.leastNickname ? 'var(--color-gray)' : 'var(--color-red)')};
      }
    }

    /* 이메일 */
    .mail-input {
      margin-bottom: var(--margin-solo);
    }

    li {
      font-size: var(--size-text);

      ::before {
        content: '- ';
      }
    }

    .at {
      margin: 0 var(--padding-solo);
    }

    .select {
      width: 150px;
      height: 30px;
      padding-left: var(--padding-solo);
      margin-left: var(--margin-solo);
      border: solid 1px var(--color-light-gray);
      background-color: var(--color-dark-white);
    }

    .mail-agree {
      width: 100%;
      background-color: var(--color-light-gray);
      padding: var(--padding-solo) var(--padding-side);
    }

    .check-info {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: var(--size-text);
    }
  }
`;
