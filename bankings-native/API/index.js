import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: 'http://192.168.4.33:8000/api' });