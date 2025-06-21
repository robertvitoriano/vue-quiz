<template>
  <AuthLayout>
    <template #content>
      <div class="course-battle-room-wrapper">
        <div class="start-course-countdown-wrapper" v-if="showCourseBattleCountdown">
          <h1 class="start-countdown-value">{{ startQuizCountdownValue }}</h1>
        </div>
        <div class="course-battle-creation-container">
          <div class="course-battle-content">
            <div class="player-container">
              <img class="player-avatar" :src="players[0].avatar || 'https://rails-quiz-images.s3.amazonaws.com/default-avatar.png'" />
              <span class="player-username" ref="player1">{{
                formatUsername(players[0].name)
                }}</span>
            </div>
            <div class="middle-container">
              <span class="vs-symbol">VS</span>
              <Button :title="'Start'" class="start-course-battle-button" @handleClick="startCourseBattleCountdown"
                v-if="hasPlayer2Joined && currentUserIsTheHost" ref="startCourseBattleButton" />
            </div>
            <div class="player-container">
              <img class="player-avatar" :src="players[1].avatar || 'https://rails-quiz-images.s3.amazonaws.com/default-avatar.png'"  v-if="hasPlayer2Joined"/>
              <div v-else class="player2-search-container">
                <div class="search-player2-icons-container">
                  <div class="player2-search-option" @click="handleCopyToast">
                    <i class="fas fa-copy text-white-500 player2-search-option-icon"></i>
                    <span>Copy course battle link</span>
                  </div>
                  <div class="player2-search-option">
                    <i class="fas fa-user-friends text-white-500 player2-search-option-icon"></i>
                    <span v-b-modal="'friendsListModal'">Invite a friend</span>
                  </div>
                  <span></span>
                </div>
              </div>
              <span class="player-username" ref="player2" v-if="hasPlayer2Joined">{{
                formatUsername(players[1].name)
                }}</span>
            </div>
          </div>
          <div class="course-creation-chat-wrapper">
            <div class="course-creation-chat-container">
              <div class="messages-container" ref="messagesContainer">
                <div v-for="(message, index) in messages" :key="index"
                  :class="handleMessageContainerClass(message.isFromUser)">
                  <img :src="handleUserAvatarMessage(message.userId)"
                    :class="handleUserAvatarMessageClass(message.isFromUser)" />
                  <div :class="handleMessageContentClass(message.userId)">
                    <span>{{ message.message }}</span>
                    <div class="timestamp-container">
                      <span class="message-timestamp">{{
                        getFormattedTimestamp(message.createdAt)
                        }}</span>
                      <div :class="handleMessageTriangleClass(message.userId)"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="is-typing-container" v-if="isTyping">
                <span class="is-typing-notification">Robert is typing ...</span>
              </div>
            </div>
            <div class="chat-input-container">
              <input class="course-creation-chat-input" placeholder="type a message" v-model="message"
                @keyup.enter="sendMessage" @keydown="sendTypingNotification" />
              <div class="send-message-button" @click="sendMessage">></div>
            </div>
          </div>
        </div>
        <Modal modalId="friendsListModal" title="Friends">
          <template #content>
            <div class="friends-select-list">
              <div class="friend-item" v-for="friend in friends" :key="friend.id"
                @click="sendInviteNotificationToFriend(friend.id)">
                {{ friend.name }}
              </div>
            </div>
          </template>
        </Modal>
      </div>
    </template>
  </AuthLayout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import tippy from "tippy.js";
import AuthLayout from "../Layout/AuthLayout.vue";
import userService from "./../services/userService";
import courseService from "../services/courseService";
import Button from "../components/Button.vue";
import ActionCable from "actioncable";
import Modal from "../components/Modal.vue";
import { Howl } from 'howler';
import "tippy.js/dist/tippy.css";
export default {
  name: "CourseBatleRooom",
  components: { AuthLayout, Button, Modal },
  created() {
    this.cable = ActionCable.createConsumer(`${process.env.VUE_APP_WEB_SOCKET_URL}/cable`, {
      courseBattleId: this.$route.params.id,
    });
  },
  mounted() {
    const courseBattleId = this.$route.params.id;
    const { name: userName, id: userId } = this.userInfo;
    this.loadFriends();
    this.setPlayers();
    const courseName = this.selectedCourse?.label
    this.subscription = this.cable.subscriptions.create(
      {
        channel: "CourseBattleChatChannel",
        courseBattleId,
      },
      {
        connected: function () {
          console.log("connected");
        },
        disconnected: function () {
          console.log("disconnected");
        },
        received: async (data) => {
          this.handleEvents(data);
        },
        sendMessage({ message, userId }) {
          this.perform("send_message", { message, userId });
        },
        sendIsTyping() {
          this.perform("send_is_typing", { userId });
        },
        sendStopTyping() {
          this.perform("send_stop_typing", { userId });
        },
        sendCourseBattleDecreaseCountdown() {
          this.perform("send_course_battle_decrease_countdown", { userId });
        },
        sendInviteNotificationToFriend(friendId) {
          this.perform("send_invite_notification_to_friend", { userName, friendId, courseName });
        }
      }
    );
  },
  data() {
    return {
      courseBattle: "",
      messages: [
        {
          message: "",
          isFromUser: "",
          userId: "",
        },
      ],
      invited: false,
      players: [
        {
          avatar: "",
          name: "",
          id: "",
        },
        {
          avatar: "",
          name: "",
          id: "",
        },
      ],
      courseBattleUsers: [
        {
          userId: "",
          name: "",
          avatar: "",
        },
      ],
      currentUserIsRegistered: true,
      subscription: null,
      message: "",
      cable: null,
      isSending: false,
      isTyping: false,
      typingTimeout: null,
      hasPlayer2Joined: false,
      startQuizCountdownValue: 5,
      showCourseBattleCountdown: false,
      startQuizCountdown: null,
      friends: [],
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
        "message-from-player1": isFromUser,
      };

      return finalClass;
    },
    async loadFriends() {
      const response = await userService.getFriends(this.userInfo.id)
      this.friends = response.data.data
    },
    async setPlayers() {
      this.changeLoadingState();
      await this.checkIfUserIsLogged();
      await this.getCourseBattleUsers();
      await this.setCourseBattleUsers();
      await this.getCourseBattleMessages();
      this.scrollMessagesContainerDown();
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
        content: this.players[0].name,
      });
      tippy(this.$refs.player2, {
        content: this.players[1].name,
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
        this.players[0].avatar = this.userInfo.avatar;
        this.players[0].name = this.userInfo.name;
        this.players[0].id = this.userInfo.id;
      } else if (
        this.courseBattleUsers.length === 1 &&
        this.userInfo.id !== this.courseBattleUsers[0].userId
      ) {
        this.players[0].avatar = this.courseBattleUsers[0].avatar;
        this.players[0].name = this.courseBattleUsers[0].name;
        this.players[0].id = this.courseBattleUsers[0].userId;
        this.players[1].avatar = this.userInfo.avatar;
        this.players[1].name = this.userInfo.name;
        this.players[1].id = this.userInfo.id;
      } else if (this.courseBattleUsers.length === 2) {
        this.players[0].avatar = this.courseBattleUsers[0].avatar;
        this.players[0].name = this.courseBattleUsers[0].name;
        this.players[0].id = this.courseBattleUsers[0].userId;
        this.players[1].avatar = this.courseBattleUsers[1].avatar;
        this.players[1].name = this.courseBattleUsers[1].name;
        this.players[1].id = this.courseBattleUsers[1].userId;
        this.hasPlayer2Joined = true;
      }
    },
    formatUsername(username) {
      if (username.length > 16) {
        const formattedUsername = username.slice(0, 13) + "...";
        return formattedUsername;
      }
      return username;
    },
    async sendMessage() {
      if (!this.message) return;
      const message = this.message;
      this.message = "";
      this.messages.push({
        isFromUser: true,
        message,
        userId: this.userInfo.id,
        createdAt: this.getFormattedTimestamp(),
      });
      this.subscription.sendMessage({
        message,
        userId: this.userInfo.id,
      });
      this.scrollMessagesContainerDown();
      await courseService.sendCourseBattleMessage({
        courseBattleId: this.$route.params.id,
        userId: this.userInfo.id,
        message,
      });
    },
    sendTypingNotification() {
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      this.typingTimeout = setTimeout(() => {
        this.subscription.sendStopTyping();
      }, 500);
      this.subscription.sendIsTyping();
    },
    async getCourseBattleMessages() {
      const response = await courseService.getCourseBattleMessages(
        this.$route.params.id
      );
      const messages = response.data.data.messages;
      this.messages = messages.map(({ userId, ...rest }) => {
        return {
          ...rest,
          userId,
          isFromUser: String(this.userInfo.id) === String(userId),
        };
      });
    },
    handleUserAvatarMessage(userId) {
      if (!userId) return "";
      const userAvatar = this.players.find((user) => user.id === userId).avatar;
      return userAvatar || 'https://rails-quiz-images.s3.amazonaws.com/default-avatar.png';
    },
    handleUserAvatarMessageClass(isFromUser) {
      return {
        "user-avatar": true,
        "avatar-message-from-user": isFromUser,
      };
    },
    scrollMessagesContainerDown() {
      setTimeout(() => {
        this.$refs.messagesContainer.scrollTop =
          this.$refs.messagesContainer.scrollHeight -
          this.$refs.messagesContainer.clientHeight;
      }, 50);
    },
    getFormattedTimestamp(timeStamp) {
      let dateTime;

      if (timeStamp) dateTime = new Date(timeStamp);

      dateTime = new Date();

      const options = {
        hour: "2-digit",
        minute: "2-digit",
      };

      const formattedDateTime = dateTime.toLocaleString("pt-BR", options);
      return formattedDateTime;
    },
    handleMessageContentClass(userId) {
      const isFromUser = userId === this.userInfo.id;
      return {
        "message-content": true,
        "message-content-player-1": isFromUser,
        "message-content-player-2": !isFromUser,
      };
    },
    handleMessageTriangleClass(userId) {
      const isFromUser = userId === this.userInfo.id;
      return {
        "message-triangle": true,
        "message-triangle-player-1": isFromUser,
        "message-triangle-player-2": !isFromUser,
      };
    },
    handleChatEvents(data) {
      const userInfo = JSON.parse(localStorage.getItem("vuex")).userInfo;
      const isFromOtherPlayer = data.userId !== userInfo.id;
      if (isFromOtherPlayer) {
        switch (data.type) {
          case "battle_room_message":
            this.receiveChatMessage(data);
            break;
          case "is_typing":
            this.isTyping = true;
            break;
          case "stop_typing":
            this.isTyping = false;
            break;
        }
      }
    },
    async receiveChatMessage(data) {
      try {
        this.playNotificationSound();
        this.messages.push({
          message: data.message,
          isFromUser: false,
          userId: data.userId,
          createdAt: this.getFormattedTimestamp(),
        });
        this.scrollMessagesContainerDown();
      } catch (error) {
        console.error(error);
      }
    },
    handleOpponentRegister(data) {
      if (data.type === "user_registered") {
        this.players[1].avatar = data.avatar;
        this.players[1].name = data.name;
        this.players[1].id = data.userId;
        this.hasPlayer2Joined = true;
      }
    },
    playNotificationSound() {
      const notification = new Howl({
        src: [
          require('@/assets/rails_quiz_notification_sound.wav')
        ],
        onloaderror(id, err) {
          console.warn('failed to load sound file:', { id, err })
        }
      })
      notification.play();
    },
    playTickSound() {
      const tickSound = new Howl({
        src: [require('@/assets/timerSound.mp3')],
        volume: 1
      });
      tickSound.play();
    },
    playTockSound() {
      const tockSound = new Howl({
        src: [require('@/assets/timerSound.mp3')],
        volume: 1
      });
      tockSound.play();
    },
    startCourseBattleCountdown() {
      this.startQuizCountdown = setInterval(
        this.decreaseStartQuizCountdown,
        1000
      );
      this.showCourseBattleCountdown = true;
    },
    async decreaseStartQuizCountdown() {
      if (this.startQuizCountdownValue === 1) {
        clearInterval(this.startQuizCountdown);
        this.$router.push(`/quiz/${this.$route.params.id}`);
      }

      await this.handleTickTockSound();

      if (this.userInfo.id === this.players[0].id) {
        this.subscription.sendCourseBattleDecreaseCountdown();
      }
    },
    async handleTickTockSound() {
      if (this.startQuizCountdownValue === 0) {
        return this.$router.push(`/quiz/${this.$route.params.id}`);
      }
      if (this.startQuizCountdownValue % 2 !== 0) {
        this.playTickSound();
        this.startQuizCountdownValue = this.startQuizCountdownValue - 1;
      } else {
        this.playTockSound();
        this.startQuizCountdownValue = this.startQuizCountdownValue - 1;
      }
    },
    decreaseCountdownWithouSound() {
      if (this.startQuizCountdownValue % 2 !== 0) {
        this.startQuizCountdownValue = this.startQuizCountdownValue - 1;
      } else {
        this.startQuizCountdownValue = this.startQuizCountdownValue - 1;
      }
      if (this.startQuizCountdownValue === 1) {
        return this.$router.push(`/quiz/${this.$route.params.id}`);
      }
    },
    handleBattleCountdownStart(data) {
      if (
        data.type === "course_battle_decrease_countdown" &&
        data.userId !== this.userInfo.id
      ) {
        if (!this.showCourseBattleCountdown) {
          this.showCourseBattleCountdown = true;
        }
        this.decreaseCountdownWithouSound();
      }
    },
    handleEvents(data) {
      this.handleChatEvents(data);
      this.handleOpponentRegister(data);
      this.handleBattleCountdownStart(data);

      console.log({ data })
    },
    sendInviteNotificationToFriend(friendId) {
      this.subscription.sendInviteNotificationToFriend(friendId)

    }
  },
  computed: {
    ...mapGetters(["userInfo", "getSelectedCourse"]),
    selectedCourse() {
      return this.getSelectedCourse;
    },
    currentUserIsTheHost(){
      return this?.userInfo.id === this?.players[0].id
    }
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

.player-avatar {
  height: 10rem;
  border-radius: 50px;
}

.course-battle-content {
  display: flex;
}

.vs-symbol {
  height: 14rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.player-username {
  display: block;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
}

.player2-search-container {
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
  justify-content: space-evenly;
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.send-message-button:hover {
  cursor: pointer;
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
  display: flex;
  align-items: center;
}

.message-from-player1 {
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
}

.message-content {
  width: fit-content;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  position: relative;
}

.message-content-player-1 {
  background-color: black;
  color: white;
}

.message-content-player-2 {
  background-color: #fff;
  color: black;
}

.message-timestamp {
  font-size: 0.85rem;
}

.timestamp-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  color: gray;
}

.user-avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 15px;
  margin-left: 15px;
}

.message-triangle {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 16px solid white;
}

.message-triangle-player-2 {
  display: block;
  position: absolute;
  left: -5px;
  bottom: 0;
}

.message-triangle-player-1 {
  display: block;
  position: absolute;
  bottom: 0;
  right: -5px;
  border-bottom: 16px solid black;
}

.is-typing-container {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  bottom: 25px;
}

.is-typing-notification {
  color: black;
}

.hidden-play-button {
  visibility: hidden;
}

.middle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.start-course-battle-button {
  font-size: 3rem;
}

.start-course-battle-button:hover {
  cursor: pointer;
}

.start-course-countdown-wrapper {
  top: 10vh;
  height: 30vh;
  width: 30vw;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.start-countdown-value {
  .player-avatar {
    width: 180px;

  }

  color: white;
  font-size: 6rem;
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

.friend-item:nth-child(odd) {
  background-color: white;
  color: black;
}

@media (min-width: 280px) {

  /*course-creation-chat-container*/
  /*player-avatar */
  /*player-container */
  /*course-battle-content */
  /*.vs-symbol */
  /*player2-search-container*/
  /*course-creation-chat-input */
  .start-course-battle-button {
    font-size: 2rem;
  }
  .player-avatar {
    width: 64px;
    height: 64px;
  }
  
  .player-container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .vs-symbol {
    font-size: 20px;
    width: 50px;
  }

  .course-battle-content {
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  .player2-search-option {
    font-size: small;
    display: flex;
    gap: 1rem;
    width: fit-content;
    line-height: 1.5rem;
  }

  .course-battle-room-wrapper {
    padding: .5rem;
  }
  .send-message-button{
    height: 2rem;
    width: 20%;
    font-size: 3rem;
  }

}

@media (min-width: 992px) {

  /*course-creation-chat-container*/
  /*player-avatar */
  /*player-container */
  /*course-battle-content */
  /*.vs-symbol */
  /*player2-search-container*/
  /*course-creation-chat-input */
  .player2-search-container {
    width: 320px;
  }

  .player-avatar {
    width: 180px;
    height: 180px;
  }

  .vs-symbol {
    font-size: 50px;
    width: 320px;
  }

  .course-battle-content {
    padding: 2rem;
  }

  .player2-search-option {
    font-size: 25px;
    display: flex;
    width: fit-content;
  }
  .send-message-button {
    height: 2rem;
    width: 4%;
    font-size: 2rem;
  }

}
</style>
