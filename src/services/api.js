import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL ||'https://api.robertvitoriano.com:3000'}/api/v1`,
  timeout: 30000, 
});

const requestInterceptor = (config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
};

const responseInterceptor = (response) => {
  return response;
};

const errorInterceptor = (error) => {
  if (error.code === 'ECONNABORTED') {
    console.error('Request timed out');
  }

    console.error(error);

  return Promise.reject(error);
};

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;
