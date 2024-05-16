'use client';

import { FormEvent, useState } from 'react';
import { api } from '../util/api';
import useInputs from './useInputs';
import { LoginIni, UserType } from '@/type/user/type';
import { useAppDispatch } from './useRedux';
import { login, logout } from '@/store/modules/loginSlice';

export default function useLogin() {
  const [userLogin, setUserLogin] = useState({ save: false, auto: false });
  const [id, setId] = useInputs('');
  const [pass, setPass] = useInputs('');

  const dispatch = useAppDispatch();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    api
      .post('/login', { id, password: pass })
      .then(res => {
        const { id, name, mail, img, super: isSuper, likes }: UserType = res.data.user;
        const userData = { id, name, mail, img, super: isSuper, likes };
        return userData;
      })
      .then(res => {
        dispatch(login(res));
        alert('로그인 되었습니다.');
      })
      .catch(res => alert('아이디와 비밀번호를 확인하세요.'));
  };

  const handleLogout = () => {
    dispatch(logout());
    alert('로그아웃 되었습니다.');
  };

  return { id, pass, setUserLogin, setId, setPass, handleLogin, handleLogout };
}
