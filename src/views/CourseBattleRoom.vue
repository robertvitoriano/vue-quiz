<template>
  <AuthLayout>
    <template #content>
      <div class="course-battle-room-wrapper">
        <div class="course-battle-creation-container">
          <div class="course-battle-content">
            <div class="player-container">
              <img class="player-avatar" :src="userInfo.avatar" />
              <span class="player-username-container">Robert</span>
            </div>
            <div class="middle-container">
              <span class="vs-symbol">VS</span>
              <div class="courses-selection-container"></div>
            </div>
            <div class="player-container">
              <img
                class="player-avatar"
                :src="enemyAvatar"
                v-if="enemyAvatar"
              />
              <div v-else class="enemy-search-container">
                <div class="search-enemy-icons-container">
                  <div class="enemy-search-option" @click="handleCopyToast">
                    <i
                      class="fas fa-copy text-white-500 enemy-search-option-icon"
                    ></i>
                    <span>Copy course battle link</span>
                  </div>
                  <div class="enemy-search-option">
                    <i
                      class="fas fa-user-friends text-white-500 enemy-search-option-icon"
                    ></i>
                    <span>Invite a friend</span>
                  </div>
                  <span></span>
                </div>
              </div>
              <span class="player-username-container">?</span>
            </div>
          </div>
          <div class="course-creation-chat-wrapper">
            <div class="course-creation-chat-container">
              <div class="messages-container">
                <div v-for="(message, index) in messages" :key="index" :class="handleMessageContainerClass(message.isFromUser)">
                  <div class="message-content">
                    <span>{{message.text}}</span
                    >
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
import { mapGetters } from "vuex";
import AuthLayout from "../Layout/AuthLayout.vue";
import userService from "./../services/userService";
import courseService from "../services/courseService";
export default {
  name: "CourseBatleRooom",
  components: { AuthLayout },
  mounted() {
    this.checkIfUserIsLogged()
    this.checkIfUserIsRegistered()
    this.messages = [
      {
        text:'Minha mensagem assasaad adsdasdas asdasdadas asdsadsad asdsdas assadsd',
        isFromUser:true
      },
      {
        text:'Minha mensagem assasaad adsdasdas asdasdadas asdsadsad asdsdas assadsd',
        isFromUser:false
      }
    ]
  },
  data() {
    return {
      courseBattle: "",
      messages:[],
      invited:false
    };
  },
  methods: {
    async checkIfUserIsLogged() {
      const token = localStorage.getItem("token");
      if (!token) return this.$router.push("/login");
      const response = await userService.checkUser();
      if(response.status !== 200) return this.$router.push("/login");
    },
    async handleCopyToast() {
      await navigator.clipboard.writeText(location.href);
      this.$toast("Copied!");
    },
    handleMessageContainerClass(isFromUser){
      const finalClass = {
        'message-container':true,
        'message-from-user':isFromUser
      }

      return finalClass
    },
    async checkIfUserIsRegistered(){
      const response= await courseService.getCourseBattleUsers(this.$route.params.id)
      const courseBattleUsers = response.data.data.courseBattleUsers
      if(courseBattleUsers.length >= 2) return this.$route.push('/home')
      const isUserAlreadyRegistered = courseBattleUsers.some((courseBattleUser) => courseBattleUser.userId === this.userInfo.id)
      if(isUserAlreadyRegistered) return
      await courseService.registerUser({courseBattleId:this.$route.params.id, userId:this.userInfo.id})
    }
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
.enemy-search-container {
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

.enemy-search-option {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
}
.search-enemy-icons-container {
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
.enemy-search-option :hover {
  text-decoration: underline;
  cursor: pointer;
}
.enemy-search-option-icon {
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
