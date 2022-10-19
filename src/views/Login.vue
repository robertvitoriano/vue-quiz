<template>
  <div class="wrapper">
    <div class="content">
      <h1 class="login-form-title">Vue Quiz App</h1>
      <form class="form-container" v-if="!isSigningUp" @submit.prevent="submit"  >
        <input v-model="loginForm.username" class="login-input" placeholder="username" required>
        <input v-model="loginForm.password" class="login-input" placeholder="password" type="password" required>
        <button  class="login-button">Login</button>
        <span>Don't have account yet ? <a class="sign-up"  @click="handleFormSwitch">Sign up</a></span>
      </form>
      <form v-if="isSigningUp" class="form-container" @submit.prevent="submit">
        <input v-model="signUpForm.name" class="login-input" placehol placeholder="name" required>
        <input v-model="signUpForm.username" class="login-input" placeholder="username" required>
        <input v-model="signUpForm.email" class="login-input" placeholder="email" type="email" required>
        <input v-model="signUpForm.password" class="login-input" placeholder="password" type="password" required>
        <a class="sign-up" @click="handleFormSwitch" >GoBack</a>
      </form>
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
        password: '',
      },
      signUpForm: {
        username: '',
        name:'',
        email:'',
        password: ''
      },
      isSigningUp:false
    }
  },
  methods: {
    async submit() {
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/v1/users/login`, this.loginForm)
        const token = response.data.token
        localStorage.setItem('token', token)
        this.$router.push('/home')
      } catch (error) {
        console.error(error)
      }
    },
    handleFormSwitch(){
      this.isSigningUp = !this.isSigningUp
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
  justify-content: space-evenly;
  align-items: center;
  color: black;
  padding-right: 10px;
  padding-left: 10px;
  height: 80%;
}

.content {
  height: 450px;
  background-color: white;
  color: black;
  border-radius: 4%;

}

.login-input {
  width: 25rem;
  height: 2.5rem;
  border-top: none;
  border-left: none;
  border-right: none;
  outline: none;
}

.login-button {
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  border-radius: 1.5rem;
}

.sign-up-button {
  background-color: transparent;
  border: none;
}

.sign-up-button:hover {
  text-decoration: underline;
}

.login-form-title {
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding-bottom: 5%;
  padding-top: 5%;
  width: 100%;
  text-align: center;
}
.sign-up:hover{
  cursor: pointer;

}
</style>
