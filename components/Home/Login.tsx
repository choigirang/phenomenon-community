import useInputs from '@/hooks/useInputs';
import React, { FormEvent } from 'react';
import { FaBell } from 'react-icons/fa';
import styled from 'styled-components';

export default function Login() {
  // 로그인 아이디
  const [id, setId] = useInputs('');
  // 로그인 패스워드
  const [pass, setPass] = useInputs('');

  const handleSubmit = (e: FormEvent) => {
    // 새로고침 방지
    e.preventDefault();
    // 유저 확인
  };

  return (
    <Container>
      <LoginBox>
        <Form action="/user" onSubmit={handleSubmit}>
          <InputBox>
            <Input type="text" placeholder="ID" value={id} onChange={setId} />
            <Input type="password" placeholder="PASSWORD" value={pass} onChange={setPass} />
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
            <span className="btm-Text">회원가입</span>
            <span className="border-Span"></span>
            <span className="btm-Text">이이디·비밀번호 찾기</span>
          </FontBox>
          <FaBell color="orange" />
        </BottomBox>
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

const OptionBox = styled.div`
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
