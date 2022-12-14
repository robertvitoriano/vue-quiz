import { handleResponse } from "./utils";
import router from './../router'
import api from './api'

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}

async function login(credentials) {
  const response = await api.post(`/users/login`,credentials);

  const { token, user } = handleResponse(response);
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user))
}

function getCurrentUser(){
  return JSON.parse(localStorage.getItem('user'))
}

async function getUsers(currentPage, usersPerPage, usersOrder){
  const response = await api.get(`/users?page=${currentPage}&limit=${usersPerPage}&order=${usersOrder}`);
  const responseHandled = handleResponse(response);
  return responseHandled
}

async function createUser(data){
  const response = await api.post(`/users/create-user`, data);
  const responseHandled = handleResponse(response);
  return responseHandled
}

async function deleteUser(userId){
  await api.delete(`/users/${userId}`)
}
export default {
  login,
  logout,
  getUsers,
  createUser,
  deleteUser,
  getCurrentUser
};
