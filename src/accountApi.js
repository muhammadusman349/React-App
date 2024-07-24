// src/api/accountApi.js
import axios from 'axios';

const accountApi = axios.create({
  baseURL: 'http://localhost:8000/api/account/',
});

export default accountApi;

