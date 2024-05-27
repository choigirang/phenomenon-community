'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Login from './login';
import { useAppDispatch } from '@/hooks/useRedux';
import { login } from '@/store/modules/loginSlice';

import { InitLoginData } from '@/type/user/type';

/** 2024/05/21 - divide layout with path*/
export default function WithLogin({ children }: React.PropsWithChildren) {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();
  // hide login path
  const checkpath = path === '/' || path === '/posts' || path === '/gallery';
  // guard path when user approch with url
  const guard = path === '/posts/edit' || path === '/notice/add';

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    const parseUser: InitLoginData = user && JSON.parse(user);
    // page guard url
    if (!parseUser && guard) {
      alert('로그인이 필요한 페이지입니다.');
      router.push('/');
    }
    // maintain login when refresh page without redux persist
    if (parseUser) {
      dispatch(login({ ...parseUser, login: true }));
    }
    // delete local when not set auto login
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
