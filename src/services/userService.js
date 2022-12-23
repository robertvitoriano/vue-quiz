import { handleResponse } from "./utils";
import router from './../router'
import api from './api'
function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}

async function login(credentials) {
  const response = await api.post(`/users/login`,credentials);

  const { token } = handleResponse(response);
  localStorage.setItem("token", token);
}

async function getUsers(currentPage, usersPerPage, usersOrder){
  const response = await api.get(`/users?page=${currentPage}&limit=${usersPerPage}&order=${usersOrder}`);
  const responseHandled = handleResponse(response);
  return responseHandled
}
export default {
  login,
  logout,
  getUsers
};
