'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import Login from './login';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/hooks/useRedux';
import { login } from '@/store/modules/loginSlice';

export default function WithLogin({ children }: React.PropsWithChildren) {
  const dispatch = useAppDispatch();
  const router = usePathname();
  const checkRouter = router === '/' || router === '/posts' || router === '/gallery';

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    const parseUser = user && JSON.parse(user);
    dispatch(login({ ...parseUser, login: true }));
  }, []);

  return (
    <div className={`${checkRouter && 'grid grid-cols-home'} gap-5 p-container py-10`}>
      {children}
      {checkRouter && <Login />}
    </div>
  );
}
