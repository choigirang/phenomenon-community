import React, { ReactEventHandler, useState } from 'react';

import SignHeader from '@/components/Sign/SignHeader';
import SignProgress from '@/components/Sign/SignProgress';

import { Bottom, NextPage } from '@/styles/GlobalComponents';
import styled from 'styled-components';
import { AiFillCheckCircle, AiFillQuestionCircle } from 'react-icons/ai';

interface InputType {
  [key: string]: string;
}

interface PassType {
  firstPass: string;
  secondPass: string;
}

const inputData: InputType = {
  아이디: '아이디',
  비밀번호: '비밀번호',
  닉네임: '닉네임',
  이메일: '이메일',
  자동입력방지: '자동 입력 방지 코드',
};

export default function info() {
  const [checkPass, setCheckPass] = useState<PassType>({
    firstPass: '',
    secondPass: '',
  });

  const checkPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCheckPass(prevCheckPass => ({
      ...prevCheckPass,
      [name]: value,
    }));
  };

  const agreementCheck = () => {};
  return (
    <>
      <SignHeader />
      <SignProgress />
      <Bottom>
        <InputContainer>
          <div className="title">기본 정보 입력</div>
          <InputBox>
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
                <div className="opt-box">
                  <div className="text-box">
                    <span className="small-title">비밀번호 필수 조건</span>
                    <div className="need-opt">
                      <AiFillCheckCircle />
                      <span>영문, 숫자, 특수문자 조합입니다.</span>
                    </div>
                    <div className="need-opt">
                      <AiFillCheckCircle />
                      <span>8 ~ 20 글자입니다..</span>
                    </div>
                  </div>
                  <span className="small-title">
                    안전정도
                    <AiFillQuestionCircle />
                  </span>
                  <div className="line-box">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 닉네임 */}
            <div className="each-data">
              <label htmlFor="name" className="sub-title">
                닉네임
              </label>
              <input id="name" type="text" placeholder="닉네임을 입력해주세요." required></input>
            </div>

            {/* 이메일 */}
            <div className="each-data">
              <label htmlFor="name" className="sub-title">
                이메일
              </label>
              <div className="mail-box">
                <div className="mail-input">
                  <input id="mail" type="text" required></input> @ <input id="url" type="text" required></input>
                  <select name="fruits" className="select">
                    <option disabled selected>
                      이메일 선택
                    </option>
                    <option value="google">gmail.com</option>
                    <option value="hanmail">hanmail.net</option>
                    <option value="hotmail">hotmail.com</option>
                    <option value="daum">daum.net</option>
                    <option value="kakao">kakao.com</option>
                    <option value="naver">naver.com</option>
                    <option value="yahoo">yahoo.com</option>
                    <option value="nate">nate.com</option>
                    <option value="user">직접 입력</option>
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

const InputBox = styled.form`
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
      display: flex;
      flex-direction: column;
      gap: 8px;
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
        color: var(--color-gray);
      }

      span {
        font-size: var(--size-text);
      }
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

    .select {
      width: 150px;
      height: 30px;
      padding-left: var(--padding-solo);
      margin-left: var(--margin-solo);
      border: solid 1px var(--color-light-gray);
      background-color: var(--color-dark-white);
      position: relative;

      option {
        position: absolute;
        top: -30px;
      }

      :first-child {
        font-weight: 500;
      }
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
