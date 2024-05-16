import { Likes } from '@/type/common';
import { LoginIni, UserType } from '@/type/user/type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: LoginIni = {
  img: '',
  id: '',
  name: '',
  mail: '',
  super: false,
  login: false,
  likes: [],
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state: LoginIni, action: PayloadAction<UserType>) => ({
      ...state,
      img: action.payload.img,
      id: action.payload.id,
      name: action.payload.name,
      mail: action.payload.mail,
      super: action.payload.super,
      login: true,
      likes: action.payload.likes,
    }),
    logout: () => initialState,
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice;
