import axios from 'axios';
import { getCookie } from '../cookie';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use();
