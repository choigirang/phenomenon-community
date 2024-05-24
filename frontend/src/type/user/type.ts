import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { Likes } from '../common';

// API Login Type
export interface LoginIni {
  img: string;
  id: string;
  name: string;
  super: boolean;
  login: boolean;
}

export interface UserType {
  img: string;
  id: string;
  password?: string;
  name: string;
  mail: string;
  refreshToken?: string;
  super: boolean;
  likes: Array<Likes>;
}

// useLogin User Data
export interface InitLoginData {
  img: string;
  id: string;
  name: string;
  super: boolean;
  auto: boolean;
}

// useLogin hooks type
export interface LoginProps {
  id: string | number;
  pass: string | number;
  setId: (e: ChangeEvent<HTMLInputElement>) => void;
  setPass: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAutoLogin: (e: string) => void;
  handleLogin: (e: FormEvent<Element>) => void;
  handleLogout: () => void;
}
