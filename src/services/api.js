import axios from 'axios'

const api = axios.create({
  baseURL:`${process.env.VUE_APP_API_URL}/api/v1`,
});

const requestIntercepter = (config) => {
  config.headers.Authorization =
  "Bearer " + localStorage.getItem("token");
  return config;
};

api.interceptors.request.use(requestIntercepter);


// api.interceptors.response.use(responseIntercepter, (err) => {
//   const authorizedUserError = err.response && err.response.status === 400 && err.response.status < 500;
//   const unauthorizedUserError = err.response.status === 401
//   if(authorizedUserError){
//     console.error(err);
//   }
//   if (unauthorizedUserError) {
//       userService.logout();
//       location.reload(true);
//     }

//     return Promise.reject(err);

// });

export default api


