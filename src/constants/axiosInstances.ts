import axios from 'axios';

export const authInstance = axios.create({ baseURL: '/auth/:path*', withCredentials: true });
