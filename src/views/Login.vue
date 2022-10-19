<template>
  <form>
    <input v-model="loginForm.email">
    <input v-model="loginForm.password">
    <button @click="submit">Login</button>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  name:'Login',
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async submit() {
      try {
        await axios.post(`${process.env.API_URL}/login`, this.loginForm, {
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
