'use client';

import { FormEvent, useEffect, useState } from 'react';
import { api } from '../util/api';
import useInputs from './useInputs';
import { InitLoginData, UserType } from '@/type/user/type';

const initLogin: InitLoginData = {
  img: '',
  id: '',
  name: '',
  super: false,
};

export default function useLogin() {
  const [userLogin, setUserLogin] = useState({ img: '', id: '', name: '', super: false });
  const [id, setId] = useInputs('');
  const [pass, setPass] = useInputs('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    api
      .post('/login', { id, password: pass })
      .then(res => {
        const { id, name, img, super: isSuper }: UserType = res.data.user;
        const userData = { id, name, img, super: isSuper };

        // 로컬 저장
        window.localStorage.setItem(
          'user',
          JSON.stringify({ img: userData.img, id: userData.id, name: userData.name, super: userData.super }),
        );
        setUserLogin({ ...userData });
        alert('로그인 되었습니다.');
        return userData;
      })
      .catch(res => alert('아이디와 비밀번호를 확인하세요.'));
  };

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUserLogin({ ...initLogin });
    alert('로그아웃 되었습니다.');
  };

  useEffect(() => {
    console.log('userLoginUpdate');
  }, [userLogin]);

  return { userLogin, id, pass, setUserLogin, setId, setPass, handleLogin, handleLogout };
}
