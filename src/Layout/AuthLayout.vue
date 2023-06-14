<template>
  <div class="auth-layout-wrapper">
    <div class="mobile-sidebar-container">
      <b-sidebar
        id="sidebar-1"
        title="Menu"
        shadow
        bg-variant="dark"
        text-variant="light"
        backdrop
        no-header-close
      >
        <div class="mobile-sidebar-content">
          <img
            :src="userInfo.avatar"
            role="button"
            alt="vue logo"
            class="avatar-image"
            />
          <span class="sidebar-name">{{ userInfo.name }}</span>
          <div class="desktop-sidebar-items-container">
            <div
              v-b-toggle.management-collapse
              class="desktop-sidebar-item-container"
              v-if="userInfo.level === 'admin'"
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
              <router-link to="/users">
                <div class="sidebar-collapse-item">Users</div>
              </router-link>
            </b-collapse>
            <router-link to="/create-course-battle">
              <div class="desktop-sidebar-item-container">Create quiz battle</div>
            </router-link>
              <div class="desktop-sidebar-item-container" @click="logout">Logout</div>
          </div>
        </div>
      </b-sidebar>
    </div>
    <div class="desktop-sidebar-container">
      <div class="desktop-sidebar-content">
        <img
          :src="userInfo.avatar"
          role="button"
          alt="vue logo"
          class="avatar-image"
        />
        <span class="sidebar-name">{{ userInfo.name }}</span>
        <div class="desktop-sidebar-items-container">
          <div
            v-b-toggle.management-collapse
            class="desktop-sidebar-item-container"
            v-if="userInfo.level === 'admin'"
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
            <router-link to="/users">
              <div class="sidebar-collapse-item">Users</div>
            </router-link>
          </b-collapse>
          <div
          v-b-toggle.friends-collapse
          class="desktop-sidebar-item-container"
        >
          Friends
        </div>
        <b-collapse
          id="friends-collapse"
          class="sidebar-collapse-items-container"
        >
          <router-link :to="`friends-list/${this.userInfo.id}`">
            <div class="sidebar-collapse-item">My Friends</div>
          </router-link>
            <div class="sidebar-collapse-item">add a friend</div>
        </b-collapse>
          <router-link to="/create-course-battle">
            <div class="desktop-sidebar-item-container">Create quiz battle</div>
          </router-link>
          <router-link to="/login">
            <div class="desktop-sidebar-item-container">Logout</div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="auth-layout-container">
      <div class="auth-layout-header-mobile">
        <b-button v-b-toggle.sidebar-1 class="toggle-sidbebar-button">
          <img src="./../assets/Hamburger_icon.svg.png" />
        </b-button>
        <b-icon
          icon="arrow-left"
          class="mobile-go-back-button"
          @click="$router.go(-1)"
          v-if="$route.path != '/home'"
        ></b-icon>

        <div class="logout-button">
          <div class="logout-link" @click="logout">Log Out</div>
        </div>
      </div>
      <div class="content-slot-container">
        <div class="page-title-container">
          <h1 v-if="pageTitle" class="page-title">{{pageTitle}}</h1>
        </div>
        <slot name="content"></slot>
      </div>
      <footer class="auth-layout-footer">
        <span class="footer-copyright"> Developed By Robert</span>
      </footer>
    </div>
  </div>
</template>

<script>
import userService from '../services/userService';
import { mapGetters } from 'vuex';
export default {
  name: "AuthLayout",
  methods:{
    logout(){
      userService.logout()
    }
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
  props:['pageTitle']
};
</script>

<style scoped>
.auth-layout-wrapper {
  display: flex;
  flex-direction: row;
}
.auth-layout-header-mobile {
  height: 10vh;
  background-color: gray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

.avatar-image {
  height: 125px;
  width: 150px;
  margin-top: 1rem;
  border-radius: 50%;
  margin-bottom: 20px;
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

.desktop-sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
.mobile-sidebar-container {
  display: none;
}
.desktop-sidebar-container {
  display: block;
}

.auth-layout-header-mobile {
  display: none;
}

.sidebar-name{
  color: white;
  font-weight: bold;
  margin-bottom: 15px;
}

@media only screen and (max-width: 992px) {

  .auth-layout-container {
    overflow: hidden;
  }
  .desktop-sidebar-container {
    display: none;
  }
  .mobile-sidebar-container {
    display: block;
  }
  .auth-layout-header-mobile {
    display: flex;
  }
  .mobile-sidebar-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .mobile-go-back-button {
    font-size: 1.8rem;
  }
  .page-title{
    text-decoration: underline;
  }
  .page-title-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
