import { AuthContextProps } from '@/types/type';
import React, { createContext } from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const setToken = (token: string) => {
    setCookie('token', token, { path: '/' });
  };

  const removeToken = () => {
    removeCookie('token', { path: '/' });
  };

  const authContextValue: AuthContextProps = {
    token: cookies.token,
    setToken,
    removeToken,
  };

  return <AuthContext.Provider value={authContextValue}></AuthContext.Provider>;
}
