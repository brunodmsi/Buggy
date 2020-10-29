import axios from 'axios';

const token = localStorage.getItem('@Buggy:token');

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
