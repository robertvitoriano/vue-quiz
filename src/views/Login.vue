<template>
  <div class="wrapper">
    <h4 v-if="courseBattleCreatorName" class="call-to-challenge">Enter your account and accept
      {{ courseBattleCreatorName }} challenge!</h4>
    <div class="content">
      <h1 class="login-form-title">Quiz Battle</h1>
      <form class="form-container" v-if="!isSigningUp" @submit.prevent="login">
        <input v-model="loginForm.username" class="login-input" placeholder="username" required />
        <input v-model="loginForm.password" class="login-input" placeholder="password" type="password" required />
        <button class="login-button">Login</button>
        <span>Don't have account yet ?
          <a class="sign-up" @click="handleFormSwitch">Sign up</a></span>
      </form>
      <form v-if="isSigningUp" class="form-container" @submit.prevent="signUp">
        <input v-model="signUpForm.name" class="login-input" placehol placeholder="name" required />
        <input v-model="signUpForm.username" class="login-input" placeholder="username" required />
        <input v-model="signUpForm.email" class="login-input" placeholder="email" type="email" required />
        <input v-model="signUpForm.password" class="login-input" placeholder="password" type="password" required />
        <div class="avatar-upload-container">
          <span v-if="!signUpForm.avatarImage" class="avatar-uplod-label">Select Avatar to upload !</span>
          <span v-else class="avatar-uplod-label">Avatar selected !</span>
          <UploadInput :handleInput="onAvatarSelect" class="avatar-upload-input" changeFileText="Change Avatar" />
        </div>
        <button class="login-button">Sign Up</button>
        <a class="sign-up" @click="handleFormSwitch">GoBack</a>
      </form>
    </div>
    <div class="google-login-button" @click="loginWithGoogle">
      <img src="./../assets/Logo-google-icon.png" class="google-icon"/>
      <span class="google-login-button-text">Continue with google</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import userService from "./../services/userService";
import courseService from "../services/courseService";
import UploadInput from "../components/Form/UploadInput.vue";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
export default {
  name: "Login",
  components: {
    UploadInput,
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      signUpForm: {
        username: "",
        name: "",
        email: "",
        password: "",
        avatarImage: "",
      },
      isSigningUp: false,
      pathToRedirectAfterLogin: "/home",
      courseBattleCreatorName: ''
    };
  },
  mounted() {
    GoogleAuth.initialize({
        clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
      });
      this.veryReturlUrl()

  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    async login() {
      try {
        this.changeLoadingState();
        await userService.login(this.loginForm);
        this.changeLoadingState();
        this.$router.push(this.pathToRedirectAfterLogin);
      } catch (error) {
        this.changeLoadingState();
        this.$swal.fire("invalid credentials!", "", "error");
        console.error(error);
      }
    },
    async loginWithGoogle() {
      
      const response = await GoogleAuth.signIn();
      const accessToken = response.authentication.accessToken;
      try{
        this.changeLoadingState();
        await userService.serverLoginWithGoogle(accessToken)
        this.changeLoadingState();
        this.$router.push(this.pathToRedirectAfterLogin);
      }catch(error){
        this.changeLoadingState();

        console.error(error);
      }

    },
    async signUp() {
      try {
        this.changeLoadingState();
        const { avatarImage, ...rest } = this.signUpForm;
        const formData = new FormData();

        if (avatarImage) formData.append("avatar", avatarImage);

        formData.append("userInfo", JSON.stringify(rest));
        await userService.createUser(formData);
        this.handleFormSwitch();
        this.changeLoadingState();
        this.$swal.fire("User successfully created!", "", "success");
      } catch (error) {
        this.changeLoadingState();
        this.$swal.fire("Error on user creation", "", "error");
        console.error(error);
      }
    },
    handleFormSwitch() {
      this.isSigningUp = !this.isSigningUp;
    },
    onAvatarSelect(event) {
      this.signUpForm.avatarImage = event.target.files[0];
    },
    veryReturlUrl() {
      switch (true) {
        case this.$route.query.returnUrl.includes('/course-battle-room'):
          this.setCourseBattleMessage()
          break;
      }
    },
    async setCourseBattleMessage() {
      this.pathToRedirectAfterLogin = this.$route.query.returnUrl
      const courseBatlleId = this.$route.query.returnUrl.split('/course-battle-room/')[1]
      const response = await courseService.getCourseBattleUsers(courseBatlleId)
      const courseBattleUsers = response.data.data.courseBattleUsers
      this.courseBattleCreatorName = courseBattleUsers[0].name
    }
  },
};
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
  gap: 2rem;
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

.sign-up:hover {
  cursor: pointer;
}

.avatar-upload-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.avatar-upload-input {
  margin: 0;
}

.avatar-uplod-label {
  text-align: center;
}

.call-to-challenge {
  color: white;
  margin-bottom: 20px;
}
.google-icon{
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
.google-login-button {
  padding: 1rem;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width:fit-content;
  height: fit-content;
  border-radius: 2rem;
  cursor: pointer;
}
.google-login-button-text{
  font-size: 1.2rem;
  color: black;
}
@media (min-width: 280px) {
  .login-input {
    width: 70vw;
  }
}

@media (min-width: 992px) {
  .login-input {
    width: 25rem;
  }
}
</style>
