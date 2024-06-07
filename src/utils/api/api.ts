import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const customConfig = config;

  if (token) customConfig.headers.Authorization = `Bearer ${token}`;

  return customConfig;
});
