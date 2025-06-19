<template>
  <div class="auth-layout-wrapper">

    <div class="mobile-sidebar-container">
      <b-sidebar id="sidebar-1" title="Menu" shadow bg-variant="dark" text-variant="light" backdrop no-header-close>
        <div class="notifications-bell-container">
          <b-button v-b-toggle.notifications-sidebar class="notification-bell-content">
            <b-icon icon="bell-fill" class="notification-bell-icon" size="lg"></b-icon>
            <div class="notifications-counter" v-if="notifications.length">{{ notifications.length }}</div>
          </b-button>
        </div>
        <div class="mobile-sidebar-content">
          <img :src="userInfo.avatar || 'https://rails-quiz-images.s3.amazonaws.com/default-avatar.png'" role="button"
            alt="vue logo" class="avatar-image" />
          <span class="sidebar-name">{{ userInfo.name }}</span>
          <div class="desktop-sidebar-items-container">
            <div v-b-toggle.management-collapse class="desktop-sidebar-item-container"
              v-if="userInfo.level === 'admin'">
              Management
            </div>
            <b-collapse id="management-collapse" class="sidebar-collapse-items-container">
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
            <div v-b-toggle.friends-collapse class="desktop-sidebar-item-container">
              Friends
            </div>
            <b-collapse id="friends-collapse" class="sidebar-collapse-items-container">
              <router-link :to="`friends-list/${this.userInfo.id}`">
                <div class="sidebar-collapse-item">My Friends</div>
              </router-link>
              <div class="sidebar-collapse-item" v-b-modal="'usersListModal'">add a friend</div>
            </b-collapse>
            <div class="desktop-sidebar-item-container" @click="logout">Logout</div>
          </div>
        </div>
      </b-sidebar>
    </div>
    <div class="desktop-sidebar-container">
      <div class="desktop-sidebar-content">
        <img :src="userInfo.avatar || 'https://rails-quiz-images.s3.amazonaws.com/default-avatar.png'" role="button"
          alt="vue logo" class="avatar-image" />
        <span class="sidebar-name">{{ userInfo.name }}</span>
        <div class="desktop-sidebar-items-container">
          <div v-b-toggle.management-collapse class="desktop-sidebar-item-container" v-if="userInfo.level === 'admin'">
            Management
          </div>
          <b-collapse id="management-collapse" class="sidebar-collapse-items-container">
            <router-link to="/courses">
              <div class="sidebar-collapse-item">Courses</div>
            </router-link>
            <router-link to="/users">
              <div class="sidebar-collapse-item">Users</div>
            </router-link>
          </b-collapse>
          <div v-b-toggle.friends-collapse class="desktop-sidebar-item-container">
            Friends
          </div>
          <b-collapse id="friends-collapse" class="sidebar-collapse-items-container">
            <router-link :to="`friends-list/${this.userInfo.id}`">
              <div class="sidebar-collapse-item">My Friends</div>
            </router-link>
            <div class="sidebar-collapse-item" v-b-modal="'usersListModal'">add a friend</div>
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
    <b-sidebar id="notifications-sidebar" title="Notifications" shadow bg-variant="dark" text-variant="light" backdrop
      no-header-close right>
      <div class="notification-list-container">
        <div v-for="notification in notifications" :key="notification.id" :class="{
          'notification-item': true,
          'not-read-notification-background-color': !notification.read
        }" @click="handleFriendshipRequestNotificationClick(notification)">
          <span class="notification-type">{{ notification.title }}</span>
          <span class="notification-description">{{ notification.description }}</span>
        </div>
      </div>

    </b-sidebar>
    <div class="auth-layout-container">
      <div class="auth-layout-header-mobile">
        <b-button v-b-toggle.sidebar-1 class="toggle-sidbebar-button">
          <div class='call-for-attention-red-dot' v-if="notifications.length"></div>
          <img src="./../assets/Hamburger_icon.svg.png" />
        </b-button>
        <b-icon icon="arrow-left" class="mobile-go-back-button" @click="$router.go(-1)"
          v-if="$route.path != '/home'"></b-icon>

        <div class="logout-button">
          <div class="logout-link" @click="logout">Log Out</div>
        </div>
      </div>

      <div class="auth-layout-header-desktop">
        <div class="notifications-bell-container">
          <div class="notifications-bell-container">
            <b-button v-b-toggle.notifications-sidebar class="notification-bell-content">
              <b-icon icon="bell-fill" class="notification-bell-icon"></b-icon>
              <div class="notifications-counter" v-if="notifications.length">{{ notifications.length }}</div>
            </b-button>
          </div>
        </div>
      </div>

      <div class="content-slot-container">
        <div class="page-title-container">
          <h1 v-if="pageTitle" class="page-title">{{ pageTitle }}</h1>
        </div>
        <slot name="content"></slot>
      </div>
      <footer class="auth-layout-footer">
        <span class="footer-copyright"> Developed By Robert</span>
      </footer>
    </div>
    <BattleInviteNotification v-if="showBattleNotificationModal" :battleId="battleInviteInfo.battleId"
      :courseName="battleInviteInfo.courseName"></BattleInviteNotification>

    <Modal modalId="usersListModal" title="Users">
      <template #content>
        <div class="users-select-list">
          <div class="user-item" v-for="user in users" :key="user.id" @click="sendFriendshipRequest(user)">
            {{ user.username }}
          </div>
        </div>
      </template>
    </Modal>
    <Modal modalId="friendShipRequestModal" ref="friendShipRequestModal" title="Friendship request!">
      <template #content>
        <h1>Accept friendship from {{ selectedNotificationInfo.friendName }}</h1>
        <Button class="friendship-request-modal-button" :title="'Accept'"
          @clicked="setFriendshipResult(selectedNotificationInfo.notifierId, FriendshipStatus.ACCEPTED.value)" />
        <Button class="friendship-request-modal-button" :title="FriendshipStatus.REJECTED.name"
          @clicked="setFriendshipResult(selectedNotificationInfo.notifierId, FriendshipStatus.REJECTED.value)" />
      </template>
    </Modal>
  </div>
</template>

<script>
import BattleInviteNotification from '../components/BattleInviteNotification.vue';
import userService from '../services/userService';
import notificationService from '../services/notificationService'
import ActionCable from "actioncable";
import Modal from '../components/Modal.vue'
import { mapGetters, mapActions } from 'vuex';
import Button from "../components/Form/Button.vue";
import {NotificationTypes}from './../utils/enums/notificationTypes'
import {FriendshipStatus}from './../utils/enums/friendshipStatus'

export default {
  name: "AuthLayout",
  components: { BattleInviteNotification, Modal, Button },
  created() {
    this.cable = ActionCable.createConsumer(`${process.env.VUE_APP_WEB_SOCKET_URL || "wss://api.robertvitoriano.com:3000"}/cable`, {
      userId: this.userInfo.id,
    });
  },
  async mounted() {
    this.changeLoadingState()
    await this.getUserNotifications()
    await this.getNonFriends()
    const userId = this.userInfo.id

    this.subscription = this.cable.subscriptions.create(
      {
        channel: "UserNotificationChannel",
        userId,
      },
      {
        connected: function () {
          console.log("connected");
        },
        disconnected: function () {
          console.log("disconnected");
        },
        received: async (data) => {
          this.handleReceivedNotifications(data)
        }
      }
    );
    this.changeLoadingState()

  },
  data() {
    return {
      cable: null,
      subscription: null,
      showBattleNotificationModal: false,
      battleInviteInfo: {
        battleId: String,
        courseName: String
      },
      friendRequestData: null,
      showFriendshipRequestModal: false,
      FriendshipStatus,
      users: [],
      notifications: [{
        type: String,
        description: String,
        title: String,
        read: Boolean,
        url: String,
      }],
      selectedNotificationInfo: Object,
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    notificationTypes:()=> Object.values(NotificationTypes).map(({type}) => type)
  },
  props: ['pageTitle'],
  methods: {
    ...mapActions(["changeLoadingState"]),
    async load() {
      await this.getNonFriends()
    },
    async getNonFriends() {
      const nonFriendsResponse = await userService.getNonFriends()
      this.users = nonFriendsResponse.data.data
    },
    async getUserNotifications() {
      const userNotificationsResponse = await notificationService.getUserNotifications()
      const userNotificationsParsed = this.parseLoadedNotificationsContent(userNotificationsResponse.data);
      this.notifications = userNotificationsParsed
    },
    logout() {
      userService.logout()
    },
    handleReceivedNotifications(notification) {
      switch (notification.type) {
        case "notification_to_join_course_battle":
          console.log({ notification })
          this.showBattleNotificationModal = true

          this.battleInviteInfo.battleId = notification.courseBattleId,
            this.battleInviteInfo.opponentName = notification.opponentName
          this.battleInviteInfo.courseName = notification.courseName

          break;
        case NotificationTypes[notification.type]:
          console.log({ notification })

          break;
      }
    },
    async sendFriendshipRequest(friend) {
      this.changeLoadingState()
      await userService.sendFriendShipRequest({ friendId: friend.id })
      this.changeLoadingState()

    },
    parseLoadedNotificationsContent(notifications) {
      return notifications.map(notification => {
        if (this.notificationTypes.includes(notification.type)) {
          return {
            id: notification.id,
            type: notification.type,
            title: NotificationTypes[notification.type].title,
            description: NotificationTypes[notification.type].getDescription(notification.notifierName),
            read: notification.isRead,
            friendName: notification.notifierName,
            notifierId: notification.notifierId
          }
        }
        else {
          return ({
            id: null,
            type: 'none',
            title: 'Unknown Notification Type',
            description: '',
            read: false,
            friendName: null,
            notifierId:
              null
          });

        }
      })
    },
    handleFriendshipRequestNotificationClick(notification) {
      this.selectedNotificationInfo = notification
      this.$refs.friendShipRequestModal.showModal();

    },
    async setFriendshipResult(notifierId, result) {
      this.$refs.friendShipRequestModal.hideModal();
      await userService.setFriendshipResult(result, notifierId)
    },

  },
};
</script>

<style scoped>
.auth-layout-wrapper {
  display: flex;
  flex-direction: row;
}

.notification-item {
  border-bottom: 1px white solid;
  color: white;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.notification-item:first-child {
  border-top: rgb(71, 71, 71) solid 2px;
}

.notification-item:hover {
  background-color: white;
  color: black;
  cursor: pointer;
}

.auth-layout-header-desktop {
  height: 8vh;
  background-color: gray;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  width: 100%;
}

.notification-bell-container {
  position: relative;
}

.notification-bell-content {
  position: relative;
  background-color: transparent;
  border: none;
  width: fit-content;
  height: fit-content;
}

.notification-bell-content:hover {
  cursor: pointer;
  background-color: initial;
}

.notifications-counter {
  background-color: red;
  color: white;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.6rem;
  position: absolute;
  top: -5px;
  right: 0;
}

.notification-list-container>.notification-item .notification-description {
  font-size: 1rem;
}

.notification-list-container>.notification-item .notification-type {
  font-size: 1.5rem;
}

.not-read-notification-background-color {
  background-color: #383838;
}

.auth-layout-header-mobile {
  height: 8vh;
  background-color: gray;
  display: none;
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

.sidebar-name {
  color: white;
  font-weight: bold;
  margin-bottom: 15px;
}

.friends-select-list {
  height: 200px;
  overflow: auto;
}

.friend-item {
  padding: 15px;
  text-align: center;
}

.friend-item:hover {
  text-decoration: underline;
  cursor: pointer;
}

.friend-item:nth-child(even) {
  background-color: black;
  color: white;
}

@media only screen and (max-width: 992px) {

  /*MOBILE */
  .auth-layout-header-desktop {
    display: none;
  }

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

  .page-title {
    text-decoration: underline;
  }

  .page-title-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .toggle-sidbebar-button {
    position: relative;
  }

  .call-for-attention-red-dot {
    width: 1rem;
    height: 1rem;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: -5px;
    right: -8px;
  }

  .notifications-bell-container {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .notification-bell-icon.b-icon.bi {
    font-size: 2.3rem;
  }

  .notification-bell-content {
    position: relative;
    background-color: transparent;
    border: none;
  }

  .notifications-counter {
    background-color: red;
    color: white;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: absolute;
    top: -5px;
  }

}

.users-select-list {
  height: 200px;
  overflow: auto;
}

.user-item {
  padding: 15px;
  text-align: center;
}

.user-item:hover {
  text-decoration: underline;
  cursor: pointer;
}

.user-item:nth-child(even) {
  background-color: black;
  color: white;
}

.user-item:nth-child(odd) {
  background-color: white;
  color: black;
}

.friendship-request-modal-button {
  cursor: pointer;
}
</style>
