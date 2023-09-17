import axios from 'axios';
import { getCookie } from '../cookie';

const env = process.env.REACT_APP_ENV;

const devEndpoint = 'http://localhost';

const prodEndpoint = 'http://13.209.167.140';

export const api = axios.create({
  baseURL: 'http://3.39.124.52:8080',
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use();
