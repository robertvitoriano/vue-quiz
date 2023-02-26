<template>
  <AuthLayout>
    <template #content>
      <div class="course-battle-room-wrapper">
        <div class="course-battle-creation-container">
          <div class="course-battle-content">
            <div class="player-container">
              <img class="player-avatar" :src="player1.avatar" />
              <span
                class="player-username-container"
                ref="player1"
                >{{ formatUsername(player1.name) }}</span
              >
            </div>
            <div class="middle-container">
              <span class="vs-symbol">VS</span>
              <div class="courses-selection-container"></div>
            </div>
            <div class="player-container">
              <img
                class="player-avatar"
                :src="player2.avatar"
                v-if="player2.avatar"
              />
              <div v-else class="player2-search-container">
                <div class="search-player2-icons-container">
                  <div class="player2-search-option" @click="handleCopyToast">
                    <i
                      class="fas fa-copy text-white-500 player2-search-option-icon"
                    ></i>
                    <span>Copy course battle link</span>
                  </div>
                  <div class="player2-search-option">
                    <i
                      class="fas fa-user-friends text-white-500 player2-search-option-icon"
                    ></i>
                    <span>Invite a friend</span>
                  </div>
                  <span></span>
                </div>
              </div>
              <span
                class="player-username-container"
                ref="player2"
                >{{ formatUsername(player2.name) }}</span
              >
            </div>
          </div>
          <div class="course-creation-chat-wrapper">
            <div class="course-creation-chat-container">
              <div class="messages-container">
                <div
                  v-for="(message, index) in messages"
                  :key="index"
                  :class="handleMessageContainerClass(message.isFromUser)"
                >
                  <div class="message-content">
                    <span>{{ message.text }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat-input-container">
              <input
                class="course-creation-chat-input"
                placeholder="type a message"
              />
              <div class="send-message-button">></div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AuthLayout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AuthLayout from "../Layout/AuthLayout.vue";
import userService from "./../services/userService";
import courseService from "../services/courseService";
import tippy from "tippy.js";

import "tippy.js/dist/tippy.css";
export default {
  name: "CourseBatleRooom",
  components: { AuthLayout },
  mounted() {
    this.setPlayers();

    this.messages = [
      {
        text: "Minha mensagem assasaad adsdasdas asdasdadas asdsadsad asdsdas assadsd",
        isFromUser: true,
      },
      {
        text: "Minha mensagem assasaad adsdasdas asdasdadas asdsadsad asdsdas assadsd",
        isFromUser: false,
      },
    ];
  },
  data() {
    return {
      courseBattle: "",
      messages: [
        {
          text: "",
          userId: "",
        },
      ],
      invited: false,
      player1: {
        avatar: "",
        name: "",
      },
      player2: {
        avatar: "",
        name: "",
      },
      courseBattleUsers: [
        {
          userId: "",
          name: "",
          avatar: "",
        },
      ],
      currentUserIsRegistered: true,
    };
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    async checkIfUserIsLogged() {
      const token = localStorage.getItem("token");
      if (!token) return this.$router.push("/login");
      const response = await userService.checkUser();
      if (response.status !== 200) return this.$router.push("/login");
    },
    async handleCopyToast() {
      await navigator.clipboard.writeText(location.href);
      this.$toast("Copied!");
    },
    handleMessageContainerClass(isFromUser) {
      const finalClass = {
        "message-container": true,
        "message-from-user": isFromUser,
      };

      return finalClass;
    },
    async setPlayers() {
      this.changeLoadingState();
      await this.checkIfUserIsLogged();
      await this.getCourseBattleUsers();
      await this.setCourseBattleUsers();
      const isUserAlreadyRegistered = this.courseBattleUsers.some(
        (courseBattleUser) => courseBattleUser.userId === this.userInfo.id
      );
      if (this.courseBattleUsers.length >= 2 && !isUserAlreadyRegistered)
        return this.$router.push("/home");
      if (!isUserAlreadyRegistered) {
        await courseService.registerUser({
          courseBattleId: this.$route.params.id,
          userId: this.userInfo.id,
        });
      }
      this.currentUserIsRegistered = true;
      tippy(this.$refs.player1, {
        content: this.player1.name,
      });
      tippy(this.$refs.player2, {
        content: this.player2.name,
      });
      this.changeLoadingState();
    },
    async getCourseBattleUsers() {
      const response = await courseService.getCourseBattleUsers(
        this.$route.params.id
      );
      this.courseBattleUsers = response.data.data.courseBattleUsers;
    },
    async setCourseBattleUsers() {
      if (
        this.courseBattleUsers.length === 1 &&
        this.userInfo.id === this.courseBattleUsers[0].userId
      ) {
        this.player1.avatar = this.userInfo.avatar;
        this.player1.name = this.userInfo.name;
      } else if (this.courseBattleUsers.length === 2) {
        this.player1.avatar = this.courseBattleUsers[0].avatar;
        this.player1.name = this.courseBattleUsers[0].name;
        this.player2.avatar = this.courseBattleUsers[1].avatar;
        this.player2.name = this.courseBattleUsers[1].name;
      }
    },
    formatUsername(username) {
      if (username.length > 16) {
        const formattedUsername = username.slice(0, 13) + "...";
        return formattedUsername;
      }
      return username;
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style scoped>
.course-battle-room-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.course-battle-content {
  padding: 2rem;
}

.player-avatar {
  width: 320px;
  height: 14rem;
  border-radius: 50px;
}
.course-battle-content {
  display: flex;
}
.vs-symbol {
  font-size: 50px;
  width: 320px;
  height: 14rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.player-username-container {
  display: block;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
}
.player2-search-container {
  width: 320px;
  height: 14rem;
  border-radius: 50px;
  border-color: black;
}

.course-creation-chat-container {
  height: 30vh;
  width: 100%;
  background-color: white;
  position: relative;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.course-battle-creation-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 92vh;
}

.player2-search-option {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
}
.search-player2-icons-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}

.course-creation-chat-input {
  width: 96%;
  height: 2rem;
  font-size: 1.5rem;
  outline: none;
}
.chat-input-container {
  display: flex;
  width: 100%;
}
.send-message-button {
  background-color: black;
  color: white;
  font-weight: bold;
  height: 2rem;
  width: 4%;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.player2-search-option :hover {
  text-decoration: underline;
  cursor: pointer;
}
.player2-search-option-icon {
  margin-right: 10px;
}
.messages-container {
  width: 100%;
  height: 100%;
  background-color: #d4d4d4;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow-y: auto;
}

.messages-container::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

.messages-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgb(0, 0, 0);
}
.message-container {
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
}
.message-from-user {
  display: flex;
  justify-content: flex-end;
}

.message-content {
  width: fit-content;
  padding: 1rem;
  background-color: black;
  color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
</style>
