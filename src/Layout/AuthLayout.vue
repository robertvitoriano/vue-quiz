<template>
  <div class="auth-layout-wrapper">
    <div class="auth-layout-header">
      <router-link to="/home">
        <img class="logo-image" src="./../assets/logo.png" role="button" alt="vue logo">
      </router-link>
      <div class="auth-layout-navigation-container">
        <div class="auth-layout-navigation-item">
          <router-link class="auth-layout-navigation-link" to='/course-creation'>Create new course</router-link>
        </div>
      </div>
      <div class="logout-button">
        <router-link class="logout-link" to="login" >Log Out</router-link>
      </div>
    </div>

    <div class="auth-layout-container">
      <slot name="content"></slot>
    </div>
    <footer class="auth-layout-footer">
      <span class="footer-copyright"> Developed By Robert</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>

<style scoped>
.auth-layout-header {
  height: 6vh;
  background-color: gray;
  display: flex;
  flex-direction: row;
  position: relative;
}

.auth-layout-navigation-link {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
}

.auth-layout-navigation-link:hover {
  text-decoration: underline;
}

.logo-image {
  height: 100%;
  position: absolute;
  left: 0;
}

.auth-layout-navigation-container {
  margin-left: 15px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.auth-layout-navigation-item {
  height: 100%;
  background-color: #F6B618;
  display: flex;
  align-items: center;
  padding-right: 10px;
  padding-left: 15px;
}

.logout-button {
  height: 100%;
  color: white;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  padding: 0 1rem 0 1rem;
}
.logout-link{
  text-decoration: none;
  color:white;
  font-size: 1.5rem;
}

.logout-link:hover{
  color: black;
  text-decoration: underline;
}


.logout-button:hover {
  background-color: white;
  text-decoration: underline;
  cursor: pointer;
}

.auth-layout-footer {
  height: 8vh;
  background-color: gray;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-copyright {
  font-weight: bold;
  font-size: 2rem;
}

.auth-layout-navigation-container {}


.auth-layout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: black;
  color: white;
  height: 86vh;
  overflow-y: scroll;
}

.auth-layout-container::-webkit-scrollbar {
  width: 12px;
}

.auth-layout-container::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.auth-layout-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px white;
}
</style>
