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
export default {
  login,
  logout,
};
