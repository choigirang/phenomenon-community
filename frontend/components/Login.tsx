import React, { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from '@/util/cookie';

import useInputs from '@/hooks/useInputs';
import { FaBell } from 'react-icons/fa';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { api } from '@/util/api';
import { UserType } from '@/types/type';

import styled from 'styled-components';

export default function Login() {
  // 로그인, 패스워드 데이터 합치기
  // 로그인 아이디
  const [id, setId] = useInputs<string>('');
  // 로그인 패스워드
  const [password, setPassword] = useInputs<string>('');
  const [user, setUser] = useState({
    id: '',
    password: '',
    name: '',
    mail: '',
    login: false,
  });

  useEffect(() => {
    api
      .get(`/user`)
      .then(res => {
        setUser(prev => ({
          ...prev,
          name: res.data.name,
          login: true,
        }));
      })
      .catch(error => {
        console.error('사용자 정보를 가져올 수 없습니다.');
      });
  }, []);

  const router = useRouter();

  // 아이디,비밀번호 입력 제출 이벤트
  const handleSubmit = (e: FormEvent) => {
    // 새로고침 방지
    e.preventDefault();
    // 유저 확인
    async function fetch() {
      await api
        .post('/login', { id, password })
        .then(res => {
          // :AxiosResponse<UserType>
          const resData = res.data;
          alert('로그인 되었습니다.');
          setUser(prev => ({
            ...prev,
            name: resData.name,
            login: true,
          }));
        })
        .catch(res => {
          alert(res);
        });
    }
    fetch();
  };

  // 로그아웃 이벤트
  const logOut = () => {
    setUser(prev => ({
      ...prev,
      name: '',
      login: false,
    }));
    alert('로그아웃 되었습니다.');
  };

  return (
    <Container>
      <LoginBox>
        {!user.login && !user.name && (
          <>
            <Form action="/user" onSubmit={handleSubmit}>
              <InputBox>
                <Input type="text" placeholder="ID" value={id} onChange={setId} />
                <Input type="password" placeholder="PASSWORD" value={password} onChange={setPassword} />
              </InputBox>
              <ButtonBox>
                <OptionBox>
                  <Option type="checkbox"></Option>
                  <span className="text">아이디저장</span>
                </OptionBox>
                <OptionBox>
                  <Option type="checkbox"></Option>
                  <span className="text">자동로그인</span>
                </OptionBox>
                <Button type="submit">로그인</Button>
              </ButtonBox>
            </Form>
            <BottomBox>
              <FontBox>
                <span className="btm-Text" onClick={() => router.push('/signup')}>
                  회원가입
                </span>
                <span className="border-Span"></span>
                <span className="btm-Text">이이디·비밀번호 찾기</span>
              </FontBox>
              <FaBell color="orange" />
            </BottomBox>
          </>
        )}
        {user.login && user.name && (
          <LoginUserBox>
            <div className="user-box">
              <span className="name">{user.name}</span>
              <span>님</span>
              <BsFillArrowRightCircleFill />
            </div>
            <div className="log-out" onClick={logOut}>
              로그아웃
            </div>
          </LoginUserBox>
        )}
      </LoginBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 170px;
  padding: var(--padding-content);
`;

// 로그인
const LoginBox = styled.div`
  width: 100%;
  height: 100%;
  padding: var(--padding-solo);
  border: var(--border-content);
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  gap: var(--padding-solo);
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--padding-solo);
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  background: var(--color-light-gray);
  padding: var(--padding-text);

  ::placeholder {
    font-size: 12px;
  }
`;

// 우측 로그인 버튼
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Button = styled.button`
  height: 100%;
  min-width: 70px;
  padding: var(--padding-text);
  color: white;
  font-weight: 700;
  background: var(--color-blue);

  :hover {
    cursor: pointer;
  }
`;

export const OptionBox = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--size-text);
`;

const Option = styled.input`
  max-width: 70px;
`;

// 회원가입, 비밀번호 찾기
const BottomBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: var(--padding-solo) 0;
  margin-top: var(--margin-small);
  border-top: var(--border-dash);
  font-size: var(--size-text);
`;

const FontBox = styled.div`
  display: flex;
  gap: 12px;

  .btm-Text {
    :hover {
      cursor: pointer;
      border-bottom: var(--border-text);
      font-weight: 500;
    }
  }

  .border-Span {
    border-right: var(--border-text);
  }
`;

// 로그인 시 컴포넌트
const LoginUserBox = styled.div`
  width: 100%;
  padding: var(--padding-solo) 0;
  font-size: var(--size-sub-title);
  display: flex;
  justify-content: space-between;

  .user-box {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      color: var(--color-blue);
      font-weight: 500;
    }

    svg {
      font-size: 14px;
    }
  }

  .log-out {
    cursor: pointer;
    font-size: var(--size-text);
    font-weight: 400;
    color: var(--color-white);
    padding: var(--padding-half) var(--padding-solo);
    background-color: var(--color-blue);
  }
`;
