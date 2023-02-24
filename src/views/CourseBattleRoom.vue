<template>
  <AuthLayout>
    <template #content>
      <div class="course-battle-room-wrapper">
        <div class="course-battle-creation-container" v-if="courseBattle">
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
                  <div class="enemy-search-option">
                    <i class="fas fa-link text-white-500"></i>
                    <span>Share course battle link</span>
                  </div>
                  <div class="enemy-search-option">
                    <i class="fas fa-user-friends text-white-500"></i>
                    <span>Invite a friend</span>
                  </div>
                  <span></span>
                </div>
              </div>
              <span class="player-username-container">?</span>
            </div>
          </div>
          <div class="course-creation-chat-container">
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
export default {
  name:"CourseBatleRooom",
  components:{AuthLayout},
  data() {
    return {
      courseBattle: "",
    };
  },
  methods: {},
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
  position: absolute;
  bottom: 0;
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
</style>
