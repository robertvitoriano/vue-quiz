import { handleResponse } from "./utils";
import router from './../router'
import api from './api'
import {store} from './../store'
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('vuex')
  router.push('/login')
}

async function login(credentials) {
  const response = await api.post(`/users/login`,credentials);

  const { token, user } = handleResponse(response);
  localStorage.setItem("token", token);
  store.commit("setUserInfo", user)
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

async function checkUser(){
  const response = await api.get('/users/check-user')
  return response
}
async function deleteUser(userId){
  await api.delete(`/users/${userId}`)
}

async function getFriends(userId){
  const respose = await api.get(`/users/friends/${userId}`)
  return respose
}
export default {
  login,
  logout,
  getUsers,
  createUser,
  deleteUser,
  checkUser,
  getFriends
};
