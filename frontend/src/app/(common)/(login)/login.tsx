'use client';

import Link from 'next/link';
import NotLogin from './notLogin';
import ExistLogin from './existLogin';
import useLogin from '@/hooks/useLogin';
import { useEffect } from 'react';
import useStorage from '@/hooks/useStorage';

const STYLE = {
  container: 'flex justify-center items-center w-full min-h-[120px] p-3 text-xs border border-blue self-start',
};

export default function Login() {
  // 로그인 훅
  const { userLogin, setUserLogin, id, pass, handleAutoLogin, setId, setPass, handleLogin, handleLogout } = useLogin();
  // 로컬 훅
  const { storageId, parseUser } = useStorage();

  const needNotLogin = { id, pass, setId, setPass, handleAutoLogin, handleLogin };

  useEffect(() => {
    if (storageId) setUserLogin(prev => ({ ...parseUser }));
  }, []);

  return (
    <div className={STYLE.container}>
      {userLogin.id ? (
        <ExistLogin userLogin={userLogin} handleLogout={handleLogout} />
      ) : (
        <NotLogin props={needNotLogin}>
          <Link href={'/sign'}>회원가입</Link>
          <Link href={'/user/findId'}>아이디·비밀번호</Link>
        </NotLogin>
      )}
    </div>
  );
}
