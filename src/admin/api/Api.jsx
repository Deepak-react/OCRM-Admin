  // src/helpers/Api.js
  import axios from 'axios';
  import { ENDPOINTS } from './ApiConstant'; 

  const API = axios.create({
    baseURL: ENDPOINTS.BASE_URL_IS,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  // Optional: Add interceptor for auth token
  API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      //console.log("Token:", token);
    }
    return config;
  });

  export default API;
