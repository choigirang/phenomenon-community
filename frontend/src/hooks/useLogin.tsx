'use client';

import { FormEvent, useEffect, useState } from 'react';
import { api } from '../util/api';
import useInputs from './useInputs';
import { InitLoginData, LoginIni, UserType } from '@/type/user/type';
import { useAppDispatch } from './useRedux';
import { login, logout } from '@/store/modules/loginSlice';

const initLogin: InitLoginData = {
  img: '',
  id: '',
  name: '',
  super: false,
  auto: false,
};

export default function useLogin() {
  const [userLogin, setUserLogin] = useState({ img: '', id: '', name: '', super: false, auto: false });
  const { keyword: id, onChange: setId } = useInputs('');
  const { keyword: pass, onChange: setPass } = useInputs('');
  const [autoLog, setAutoLog] = useState({ id: false, auto: false });

  const dispatch = useAppDispatch();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    api
      .post('/login', { id, password: pass })
      .then(res => {
        const { id, name, img, super: isSuper }: LoginIni = res.data.user;
        const userData = { id, name, img, super: isSuper, auto: autoLog.auto };

        // 로컬 저장
        window.localStorage.setItem('user', JSON.stringify(userData));

        setUserLogin({ ...userData });
        dispatch(login({ ...userData, login: true }));
        alert('로그인 되었습니다.');
        return userData;
      })
      .catch(res => alert('아이디와 비밀번호를 확인하세요.'));
  };

  const handleAutoLogin = (e: string) => {
    if (e === 'id') setAutoLog(prev => ({ ...prev, id: !prev.id }));
    if (e === 'auto') setAutoLog(prev => ({ ...prev, auto: !prev.auto }));
  };

  const handleLogout = () => {
    if (!autoLog.auto) {
      window.localStorage.removeItem('user');
    }
    if (autoLog.id) {
      window.localStorage.setItem('user', JSON.stringify({ ...initLogin, id: userLogin.id }));
    }

    setUserLogin({ ...initLogin });
    dispatch(logout());
    alert('로그아웃 되었습니다.');
  };

  return { userLogin, id, pass, setUserLogin, setId, setPass, handleAutoLogin, handleLogin, handleLogout };
}
