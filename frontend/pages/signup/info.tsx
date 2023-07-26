import React, { useState } from 'react';

import SignHeader from '@/components/Sign/SignHeader';
import SignProgress from '@/components/Sign/SignProgress';

import { Bottom } from '@/styles/GlobalComponents';
import styled from 'styled-components';
import { AiFillCheckCircle, AiFillQuestionCircle } from 'react-icons/ai';

interface InputType {
  [key: string]: string;
}

const inputData: InputType = {
  아이디: '아이디',
  비밀번호: '비밀번호',
  닉네임: '닉네임',
  이메일: '이메일',
  자동입력방지: '자동 입력 방지 코드',
};

export default function info() {
  const [checkPass, setCheckPass] = useState({});

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
                <input id="pass" type="password" placeholder="비밀번호를 입력해주세요." required />
                <input type="password" placeholder="비밀번호를 다시 입력해주세요." required />
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
                </div>
                <ul className="text-box">
                  <li>보안 코드는 식별 코드 찾기/비밀번호 재설정 및 탈퇴 시 사용되므로 발급을 부탁드립니다.</li>
                  <li>인증 코드 발송 후 코드를 입력해 주시기 부탁드립니다.</li>
                  <li>
                    발급된 인증 코드는 개인 정보 보호를 위해 5분간만 유효합니다. 유효 시간이 경과할 경우 재발급을
                    받아주시기 바랍니다.
                  </li>
                </ul>
              </div>
            </div>
          </InputBox>
        </InputContainer>
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
      padding-left: var(--padding-solo);
      padding-top: var(--padding-solo);
    }

    .text-box {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 4px;
      font-size: var(--size-text);

      li {
        list-style: disc;
      }
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
  }
`;
