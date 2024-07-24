// src/api/moviesApi.js
import axios from 'axios';

const moviesApi = axios.create({
  baseURL: 'http://localhost:8000/api/movies/',
});

moviesApi.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default moviesApi;
