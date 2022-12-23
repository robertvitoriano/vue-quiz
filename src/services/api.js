import axios from 'axios'

const api = axios.create({
  baseURL:`${process.env.VUE_APP_API_URL}/api/v1`,
  headers:{
    authorization:"Bearer " + localStorage.getItem("token")
  }
})

export default api
