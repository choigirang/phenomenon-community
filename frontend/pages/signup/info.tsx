import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FormEvent } from 'react';
import { useRouter } from 'next/router';

import SignHeader from '@/components/Sign/SignHeader';
import SignProgress from '@/components/Sign/SignProgress';
import { api } from '@/util/api';

import { Bottom, NextPage } from '@/styles/GlobalComponents';
import { AiFillCheckCircle } from 'react-icons/ai';

interface InputType {
  [key: string]: string;
}

interface AxiosSecurityCode {
  code: string;
  userCode: string;
}

type Check = {
  [key: string]: string | boolean;
};

type ValidationItem = {
  name: string;
  check: (data: string) => boolean;
};

type InputData = {
  validatePass: boolean;
  leastPass: boolean;
  // leastNickname: boolean;
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

export default function info() {
  const router = useRouter();

  // 아이디
  const [id, setId] = useState<Check>({
    userId: '',
    required: false,
  });

  // 비밀번호
  const [checkPass, setCheckPass] = useState<InputType>({
    firstPass: '',
    secondPass: '',
  });
  const [validatePass, setValidatePass] = useState(false);

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
  }, [checkPass.secondPass]);

  // 닉네임 유효성 검사
  const [nickname, setNickName] = useState<Check>({
    name: '',
    checkName: false,
  });

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

  //  이메일 관리
  const [userMail, setUserMail] = useState<InputType>({
    mail: '',
    domain: '',
  });
  const [inputAble, setInputAble] = useState<boolean>(false);

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

  // 보안 코드 관리
  const [security, setSecurity] = useState<AxiosSecurityCode>({
    code: '',
    userCode: '',
  });
  const [checkSecurity, setCheckSecurity] = useState({
    agree: false,
    compareSecurityCode: false,
    errInfo: '',
    errCode: '',
  });

  // 이메일 수집 동의
  const securityAgreeHandler = () => {
    setCheckSecurity(prev => ({
      ...prev,
      agree: !prev.agree,
    }));
  };

  // 보안 코드 입력
  const userCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSecurity(prev => ({ ...prev, userCode: value }));
  };

  // 메일 확인과 수집 동의 확인
  const checkMailOpt = userMail.mail !== '' && userMail.domain !== '' && checkSecurity.agree;

  // 보안 코드 전송 메일 확인
  const checkMailBeforeSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (checkMailOpt) {
      sendCodeHandler();
    } else {
      setCheckSecurity(prev => ({
        ...prev,
        errInfo: '수집 동의와 올바른 이메일 입력이 필요합니다.',
      }));
      alert(checkSecurity.errInfo);
    }
  };

  // 보안 코드 전송
  const sendCodeHandler = () => {
    api
      .post('/signin/security-code', userMail)
      .then(res => {
        alert('보안 코드가 전송되었습니다.');
        setSecurity(prev => ({
          ...prev,
          code: res.data.toString(),
        }));
      })
      .catch(err => console.log(err));
  };

  // 보안 코드 확인
  const compareSecurityCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (security.code !== '' && security.code !== security.userCode) {
      alert('보안 코드를 확인해주세요.');
      setCheckSecurity(prev => ({
        ...prev,
        compareSecurityCode: false,
      }));
      console.log(security.code, security.userCode);
    } else {
      alert('보안 코드 확인이 완료되었습니다.');
      setCheckSecurity(prev => ({
        ...prev,
        compareSecurityCode: true,
      }));
    }
  };

  //  제출
  const agreementCheck = (e: FormEvent) => {
    e.preventDefault();
    const userInfo = {
      id: id.userId,
      password: checkPass.secondPass,
      name: nickname.name,
      mail: `${userMail.mail}@${userMail.domain}`,
    };

    const signIn = () =>
      api
        .post('/signin', userInfo)
        .then(res => {
          alert('회원가입이 완료되었습니다.');
          console.log(res);
        })
        .catch(err => console.log(err));

    if (checkSecurity.compareSecurityCode) {
      signIn();
      // return router.push('/signup/complete');
    } else alert('회원 가입에 실패했습니다. 다시 진행해주세요.');
  };
  return (
    <>
      <SignHeader />
      <SignProgress />
      <Bottom onSubmit={agreementCheck}>
        <InputContainer>
          <div className="title">기본 정보 입력</div>
          <InputBox validatePass={validatePass} leastPass={confirmPass && checkPass.secondPass.length >= 8}>
            {/* leastNickname={nickname.checkName} */}
            {/* 아이디 */}
            <div className="each-data">
              <label htmlFor="id" className="sub-title">
                아이디
              </label>
              <input
                id="id"
                name="userId"
                type="text"
                placeholder="아이디를 입력해주세요."
                onChange={checkIdHandler}
                required></input>
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
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  onChange={nicknameHandler}
                  required
                />
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
                  <select name="domain" value={userMail.domain} className="select" onChange={selectDirect}>
                    <option defaultValue="" value="">
                      이메일 선택
                    </option>
                    {Object.keys(options).map(opt => (
                      <option value={options[opt]} key={options[opt]}>
                        {options[opt]}
                      </option>
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

                {/* 보안 코드 */}
                <div className="mail-agree">
                  <div className="agree-box">
                    <span className="small-title">이메일 수집 동의</span>
                    <div className="check-info">
                      <input type="checkbox" id="agree" onClick={securityAgreeHandler} />
                      <label htmlFor="agree">
                        입력하신 이메일은 인증 및 보안 코드 전송을 위해 사용하며, 이메일 발송 후 즉시 파기됩니다.
                      </label>
                    </div>
                  </div>
                  <div className="check-security">
                    <div className="security-input">
                      <input type="text" placeholder="인증 코드 입력" onChange={userCode} />
                      <button onClick={e => compareSecurityCode(e)}>확인</button>
                    </div>
                    <button className="send-code" onClick={e => checkMailBeforeSend(e)}>
                      인증 코드 받기
                    </button>
                  </div>
                  <p className="security-err">{checkSecurity.errInfo}</p>
                  <p className="security-err">{checkSecurity.errCode}</p>
                </div>
              </div>
            </div>
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

const InputBox = styled.div<InputData>`
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
        // color: ${props => (props ? 'var(--color-gray)' : 'var(--color-red)')};
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

    .agree-box {
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

    .check-security {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-top: var(--padding-solo);
    }

    .security-input {
      float: left;
      border: var(--border-solid1) var(--color-blue);

      input {
        width: 145px;
        border: none;
        padding: var(--padding-solo);
        line-height: 33px;
      }

      button {
        width: 50px;
        height: 33px;
        font-weight: bold;
        text-shadow: 0px -1px var(--color-dark-blue);
        color: var(--color-white);
        background: var(--color-blue);
      }
    }

    .send-code {
      font-weight: bold;
      height: 33px;
      padding: 0 var(--padding-solo);
      border: var(--border-solid1) var(--color-blue);
      background: white;
      color: var(--color-blue);
    }

    .security-err {
      font-size: var(--size-text);
      padding-top: var(--padding-solo);
    }
  }
`;
