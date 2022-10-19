<template>
  <form>
    <input v-model="loginForm.username">
    <input v-model="loginForm.password">
    <div @click="submit">Login</div>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  name:'Login',
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
