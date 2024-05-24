'use client';

import { FormEvent, useState } from 'react';
import useInputs from './useInputs';
import { api } from '../util/api';
import { useAppDispatch } from './useRedux';
import { login, logout } from '@/store/modules/loginSlice';

import { InitLoginData, LoginIni } from '@/type/user/type';

const initLogin: InitLoginData = {
  img: '',
  id: '',
  name: '',
  super: false,
  auto: false,
};

/** 2024/05/12 - user login hooks */
export default function useLogin() {
  // init user login data
  const [userLogin, setUserLogin] = useState({ img: '', id: '', name: '', super: false, auto: false });
  // id by input hooks
  const { keyword: id, onChange: setId } = useInputs('');
  // password by input hooks
  const { keyword: pass, onChange: setPass } = useInputs('');
  // save id | auto login
  const [autoLog, setAutoLog] = useState({ id: false, auto: false });

  const dispatch = useAppDispatch();

  // login func
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    api
      .post('/login', { id, password: pass })
      .then(res => {
        const { id, name, img, super: isSuper }: LoginIni = res.data.user;
        const userData = { id, name, img, super: isSuper, auto: autoLog.auto };

        // save local for ssr (page move without redux persist)
        window.localStorage.setItem('user', JSON.stringify(userData));

        setUserLogin({ ...userData });
        dispatch(login({ ...userData, login: true }));
        alert('로그인 되었습니다.');
        return userData;
      })
      .catch(res => alert('아이디와 비밀번호를 확인하세요.'));
  };

  // set login option func
  const handleAutoLogin = (e: string) => {
    if (e === 'id') setAutoLog(prev => ({ ...prev, id: !prev.id }));
    if (e === 'auto') setAutoLog(prev => ({ ...prev, auto: !prev.auto }));
  };

  // logout func
  const handleLogout = () => {
    // auto login option
    if (!autoLog.auto) {
      window.localStorage.removeItem('user');
    }
    // save id option
    if (autoLog.id) {
      window.localStorage.setItem('user', JSON.stringify({ ...initLogin, id: userLogin.id }));
    }

    setUserLogin({ ...initLogin });
    dispatch(logout());
    alert('로그아웃 되었습니다.');
  };

  return { userLogin, id, pass, setUserLogin, setId, setPass, handleAutoLogin, handleLogin, handleLogout };
}
