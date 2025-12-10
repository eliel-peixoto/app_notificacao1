import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.31.90.108:3000',
});

export default api;