'use client';

import { FormEvent, useState } from 'react';
import { api } from '../util/api';
import useInputs from './useInputs';
import { UserType } from '@/type/user/type';

export default function useLogin() {
  const [login, setLogin] = useState({ save: false, auto: false });
  const [id, setId] = useInputs('');
  const [pass, setPass] = useInputs('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    api.post('/login', { id, password: pass }).then(res => {
      const { id, name, mail, img, super: isSuper, likes }: UserType = res.data.user;
      const userData = { id, name, mail, img, super: isSuper, likes };
      console.log(userData);
      return userData;
    });
  };

  return { id, pass, setLogin, setId, setPass, handleLogin };
}
