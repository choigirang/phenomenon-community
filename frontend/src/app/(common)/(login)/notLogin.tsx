'use client';
import { LoginProps } from '@/type/user/type';
import React from 'react';

interface Props {
  children: React.ReactNode;
  props: Partial<LoginProps>;
}

const STYLE = {
  form: 'grid grid-cols-login w-full gap-3',
  flexRows: 'flex items-center gap-0.5',
  flexCol: 'flex flex-col gap-2',
  input: 'px-2 py-1 bg-pastelBlue focus:outline-none',
  button: 'flex justify-center items-center p-2 text-white bg-lightBlue',
};

export default function NotLogin({ children, props }: Props) {
  return (
    <form className={STYLE.form} onSubmit={props.handleLogin} name="login">
      {/* Id & Pass */}
      <div className={STYLE.flexCol}>
        <input
          type="text"
          placeholder="테스트 아이디 : test"
          value={props.id}
          onChange={props.setId}
          className={STYLE.input}
          autoComplete="current-username"
        />
        <input
          type="password"
          placeholder="비밀번호 : 1234"
          value={props.pass}
          onChange={props.setPass}
          className={STYLE.input}
          autoComplete="current-password"
        />

        {/* Sign & find info children */}
        <div className={`${STYLE.flexRows} justify-between`}>{children}</div>
      </div>

      {/* Login Options */}
      <div className={`${STYLE.flexCol} text-xs`}>
        <div className={STYLE.flexRows}>
          {/* <input type="checkbox" onChange={() => setUserLogin(prev => ({ ...prev, save: !prev.save }))} /> */}
          <span>아이디 저장</span>
        </div>
        <div className={STYLE.flexRows}>
          {/* <input type="checkbox" onChange={() => setUserLogin(prev => ({ ...prev, auto: !prev.auto }))} /> */}
          <span>자동 로그인</span>
        </div>
        <button type="submit" className={STYLE.button} onClick={props.handleLogin}>
          로그인
        </button>
      </div>
    </form>
  );
}
