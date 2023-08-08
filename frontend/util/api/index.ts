import axios from 'axios';
import { getCookie } from '../cookie';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  // 이후 쿠키
  // headers: {
  //   'Content-Type': 'application/json',
  //   Authorization: getCookie('accessToken'),
  // },
});

export { api };
