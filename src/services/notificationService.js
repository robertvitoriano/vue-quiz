import { handleResponse } from "./utils";
import api from './api'

async function getUserNotifications(){
  const response = await api.get(`/notifications`);
  const responseHandled = handleResponse(response);
  return responseHandled
}

export default {
  getUserNotifications,
};
