import axios from 'axios';

const baseURL = 'http://127.0.0.1:3333';

const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
