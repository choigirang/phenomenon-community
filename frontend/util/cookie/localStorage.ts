import { User } from '@/types/type';

export function setToken(accessToken: string, refreshToken: string) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function deleteToken() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function saveLoginData(user: User) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function deleteLoginData() {
  localStorage.removeItem('user');
}
