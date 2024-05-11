import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, minutes: number) => {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
};

export const getCookie = (name: string): string | null => {
  console.log(name);
  return cookies.get(name) || null;
};

export const deleteCookie = (name: string) => {
  const expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = name + '=' + expires;
};
