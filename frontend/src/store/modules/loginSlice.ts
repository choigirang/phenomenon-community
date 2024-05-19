import { Likes } from '@/type/common';
import { LoginIni, UserType } from '@/type/user/type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: LoginIni = {
  img: '',
  id: '',
  name: '',
  super: false,
  login: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state: LoginIni, action: PayloadAction<LoginIni>) => ({
      ...state,
      img: action.payload.img,
      id: action.payload.id,
      name: action.payload.name,
      super: action.payload.super,
      login: true,
    }),
    logout: () => initialState,
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice;
