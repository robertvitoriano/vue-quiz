<template>
  <div class="wrapper">
    <h1>Vue Quiz App</h1>
    <div class="form-container">
      <input v-model="loginForm.username" class="login-input">
      <input v-model="loginForm.password" class="login-input">
      <div @click="submit" class="login-button">Login</div>
      <div @click="submit" class="login-button">Sign up</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async submit() {
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/api/v1/users/login`, this.loginForm, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: black;
  width:50%;
  height:70%;
  border-radius: 4%;
}
</style>
