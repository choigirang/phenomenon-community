'use client';

import useLogin from '@/hooks/useLogin';
import React from 'react';
import { useDispatch } from 'react-redux';

const STYLE = {
  form: 'grid grid-cols-login w-full gap-3',
  flexRows: 'flex items-center gap-0.5',
  flexCol: 'flex flex-col gap-2',
  input: 'px-2 py-1 bg-pastelBlue focus:outline-none',
  button: 'flex justify-center items-center p-2 text-white bg-lightBlue',
};

export default function NotLogin({ children }: React.PropsWithChildren) {
  const { id, pass, setId, setPass, setUserLogin, handleLogin } = useLogin();

  return (
    <form className={STYLE.form} onSubmit={handleLogin}>
      {/* Id & Pass */}
      <div className={STYLE.flexCol}>
        <input type="text" placeholder="테스트 아이디 : test" value={id} onChange={setId} className={STYLE.input} />
        <input type="password" placeholder="비밀번호 : 1234" value={pass} onChange={setPass} className={STYLE.input} />

        {/* Sign & find info children */}
        <div className={`${STYLE.flexRows} justify-between`}>{children}</div>
      </div>

      {/* Login Options */}
      <div className={`${STYLE.flexCol} text-xs`}>
        <div className={STYLE.flexRows}>
          <input type="checkbox" onChange={() => setUserLogin(prev => ({ ...prev, save: !prev.save }))} />
          <span>아이디 저장</span>
        </div>
        <div className={STYLE.flexRows}>
          <input type="checkbox" onChange={() => setUserLogin(prev => ({ ...prev, auto: !prev.auto }))} />
          <span>자동 로그인</span>
        </div>
        <button type="submit" className={STYLE.button} onClick={handleLogin}>
          로그인
        </button>
      </div>
    </form>
  );
}
