<template>
  <div class="auth-layout-wrapper">
    <div class="sidebar-container">
      <b-sidebar
        id="sidebar-1"
        title="Sidebar"
        shadow
        no-header-close
        v-if="isMobile"
      ></b-sidebar>
      <div v-if="!isMobile" class="desktop-sidebar-container">
        <img
          src="./../assets/logo.png"
          role="button"
          alt="vue logo"
          class="desktop-logo-image"
        />
        <div class="desktop-sidebar-items-container">
          <div
            v-b-toggle.management-collapse
            class="desktop-sidebar-item-container"
          >
            Management
          </div>
          <b-collapse
            id="management-collapse"
            class="sidebar-collapse-items-container"
          >
            <router-link to="/courses">
              <div class="sidebar-collapse-item">Courses</div>
            </router-link>
            <div class="sidebar-collapse-item">Users</div>
          </b-collapse>
          <router-link to="/home">
            <div class="desktop-sidebar-item-container">Courses</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="auth-layout-container">
      <div class="auth-layout-header" v-if="isMobile">
        <b-button
          v-b-toggle.sidebar-1
          class="toggle-sidbebar-button"
          v-if="isMobile"
          >Toggle Sidebar</b-button
        >
        <router-link to="/home">
          <img
            class="logo-image"
            src="./../assets/logo.png"
            role="button"
            alt="vue logo"
          />
        </router-link>

        <div class="logout-button">
          <router-link class="logout-link" to="/login">Log Out</router-link>
        </div>
      </div>
      <div class="content-slot-container">
        <slot name="content"></slot>
      </div>
      <footer class="auth-layout-footer">
        <span class="footer-copyright"> Developed By Robert</span>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  props: ["user"],
};
</script>

<style scoped>
.auth-layout-wrapper {
  display: flex;
  flex-direction: row;
}
.auth-layout-header {
  height: 6vh;
  background-color: gray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  width: 100%;
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
}

.auth-layout-navigation-container {
  margin-left: 15px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.auth-layout-navigation-item {
  height: 100%;
  background-color: #f6b618;
  display: flex;
  align-items: center;
  padding-right: 10px;
  padding-left: 15px;
}

.content-slot-container {
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  overflow-x: unset;
}

.logout-button {
  height: 100%;
  color: white;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem 0 1rem;
}
.logout-link {
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
}

.logout-link:hover {
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
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-top: 1px solid white;
}

.footer-copyright {
  font-weight: bold;
  font-size: 2rem;
}

.auth-layout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: black;
  color: white;
  height: 100vh;
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

.sidebar-wrapper {
  background-color: black;
  width: fit-content;
  height: fit-content;
}

.desktop-sidebar-container {
  width: 20vw;
  background-color: black;
  height: 100vh;
  border-right: white 2px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.desktop-logo-image {
  height: 60px;
  width: 60px;
  margin-top: 1rem;
}

.desktop-sidebar-items-container {
  width: 100%;
  text-align: center;
}
.desktop-sidebar-item-container {
  width: 100%;
  color: white;
  background-color: transparent;
  padding-top: 15px;
  padding-bottom: 15px;
  border: solid white 2px;
  border-radius: 2rem;
}
.desktop-sidebar-item-container:hover {
  color: black;
  background-color: white;
  cursor: pointer;
}

.desktop-sidebar-item-text {
  text-decoration: none;
  color: white;
  cursor: pointer;
}

.sidebar-collapse-items-container {
  color: black;
}

.sidebar-collapse-item {
  color: white;
}
.sidebar-collapse-item:hover {
  text-decoration: underline;
  cursor: pointer;
}
@media only screen and (max-width: 280px) {
  .auth-layout-container {
    overflow: hidden;
  }
}
</style>
