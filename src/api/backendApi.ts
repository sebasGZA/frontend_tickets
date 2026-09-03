import axios from 'axios';

const backendApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

backendApi.interceptors.request.use(
  (config) => {
    const isLoginRequest = config.url?.includes('auth/login');

    if (!isLoginRequest) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { backendApi };