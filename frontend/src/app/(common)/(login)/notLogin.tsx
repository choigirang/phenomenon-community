'use client';
import { LoginProps } from '@/type/user/type';
import React from 'react';

interface Props {
  children: React.ReactNode;
  props: Partial<LoginProps>;
}

// tw style
const STYLE = {
  form: 'grid grid-cols-login w-full gap-3',
  flexRows: 'flex items-center gap-0.5',
  flexCol: 'flex flex-col gap-2',
  input: 'px-2 py-1 bg-pastelBlue focus:outline-none',
  button: 'flex justify-center items-center p-2 text-white bg-lightBlue',
};

/** 2024/05/16 - if not login */
export default function NotLogin({ children, props }: Props) {
  return (
    <form className={STYLE.form} onSubmit={props.handleLogin} name="login">
      <div className={STYLE.flexCol}>
        {/* Id & Pass */}
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
        {/* save id */}
        <label htmlFor="saveId" className={STYLE.flexRows}>
          <input
            type="checkbox"
            id="saveId"
            onChange={() => {
              if (props.handleAutoLogin) props.handleAutoLogin('id');
            }}
          />
          <span>아이디 저장</span>
        </label>
        {/* auto login */}
        <label htmlFor="autoLogin" className={STYLE.flexRows}>
          <input
            type="checkbox"
            id="autoLogin"
            onChange={() => {
              if (props.handleAutoLogin) props.handleAutoLogin('auto');
            }}
          />
          <span>자동 로그인</span>
        </label>
        <button type="submit" className={STYLE.button} onClick={props.handleLogin}>
          로그인
        </button>
      </div>
    </form>
  );
}
