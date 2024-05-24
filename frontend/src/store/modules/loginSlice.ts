import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginIni } from '@/type/user/type';

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
