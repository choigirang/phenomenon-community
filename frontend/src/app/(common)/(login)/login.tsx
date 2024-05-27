'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import NotLogin from './notLogin';
import ExistLogin from './existLogin';

import useLogin from '@/hooks/useLogin';
import useStorage from '@/hooks/useStorage';

const STYLE = {
  container: 'flex justify-center items-center w-full min-h-[120px] p-3 text-xs border border-blue self-start',
};

/** 2024/05/16 - login */
export default function Login() {
  // login hooks
  const { userLogin, setUserLogin, id, pass, handleAutoLogin, setId, setPass, handleLogin, handleLogout } = useLogin();
  // check local(auto login) hooks
  const { storageId, parseUser } = useStorage();
  // notLogin component props
  const needNotLogin = { id, pass, setId, setPass, handleAutoLogin, handleLogin };

  // set auto login if user check auto login
  useEffect(() => {
    if (storageId) setUserLogin(prev => ({ ...parseUser }));
  }, []);

  return (
    <div className={STYLE.container}>
      {userLogin.id ? (
        // when login
        <ExistLogin userLogin={userLogin} handleLogout={handleLogout} />
      ) : (
        // when not login
        <NotLogin props={needNotLogin}>
          <Link href={'/sign?page=agree'}>회원가입</Link>
          <Link href={'/user/findId'}>아이디·비밀번호</Link>
        </NotLogin>
      )}
    </div>
  );
}
