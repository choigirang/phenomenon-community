import axios from 'axios';
import { getCookie } from '../cookie';

const api = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getCookie('accessToken'),
  },
});

export { api };
