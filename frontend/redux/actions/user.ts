import { User } from '@/types/type';

// actions.js
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (userInfo: User) => ({
  type: LOGIN_SUCCESS,
  payload: userInfo,
});

export const logout = () => ({
  type: LOGOUT,
});
