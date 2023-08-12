export function setToken(accessToken: string, refreshToken: string) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function deleteToken() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
