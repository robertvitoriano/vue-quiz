import axios from "axios";
import { handleResponse } from "./utils";
import router from './../router'
function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}

async function login(credentials) {
  const response = await axios.post(
    `${process.env.VUE_APP_API_URL}/api/v1/users/login`,
    credentials
  );

  const { token } = handleResponse(response);
  localStorage.setItem("token", token);
}

async function getUsers(currentPage, usersPerPage, usersOrder){
  const response = await axios.get(
    `${process.env.VUE_APP_API_URL}/api/v1/users?page=${currentPage}&limit=${usersPerPage}&order=${usersOrder}`,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  const responseHandled = handleResponse(response);
  return responseHandled

}
export default {
  login,
  logout,
  getUsers
};
