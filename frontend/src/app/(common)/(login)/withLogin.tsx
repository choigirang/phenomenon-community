'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import Login from './login';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/useRedux';
import { login } from '@/store/modules/loginSlice';
import { InitLoginData } from '@/type/user/type';

export default function WithLogin({ children }: React.PropsWithChildren) {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();
  const checkpath = path === '/' || path === '/posts' || path === '/gallery';
  const guard = path === '/post/edit' || path === '/notice/add';

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    const parseUser: InitLoginData = user && JSON.parse(user);
    if (!parseUser && guard) {
      alert('로그인이 필요한 페이지입니다.');
      router.push('/');
    }

    if (parseUser) {
      dispatch(login({ ...parseUser, login: true }));
    }

    const handleAutoLogin = () => {
      if (parseUser && !parseUser.auto) window.localStorage.removeItem('user');
    };

    window.addEventListener('beforeunload', handleAutoLogin);

    return () => {
      window.removeEventListener('beforeunload', handleAutoLogin);
    };
  }, []);

  return (
    <div className={`${checkpath && 'grid grid-cols-home'} gap-5 p-container py-10`}>
      {children}
      {checkpath && <Login />}
    </div>
  );
}
