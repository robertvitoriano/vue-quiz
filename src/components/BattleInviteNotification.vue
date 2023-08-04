<template>
  <div class="notification-wrapper">
    <div class="notification-header">
      <div class="header-content">
        <div class="notification-title">
          <span>Battle Notification</span>
        </div>
        <div class="close-button">x</div>
      </div>
    </div>
    <div class="notification-content">
      <p class="notification-info">You were invited by {{opponentName}} to battle the course {{courseName}}</p>  
      <Button :title="'Enter battle!'" @click="goToCourseBattle" ></Button>
    </div>
  </div>
</template>
<script>
import Button from './Button.vue';
export default {
  name: "BattleInviteNotification",
  components:{Button},
  mounted() {
    console.log({courseName:this.courseName})
  },
  props: ["battleId", "courseName", "opponentName"],
  methods:{
    goToCourseBattle(){
      this.$router.push(`/course-battle-room/${this.battleId}`)
    }
  }
};
</script>
<style scoped >
.notificaton-wrapper {
  height:400px;
  width:200px;
  background-color: black;
  color:white;
  border-color: white;
  border-radius: 1rem;
  
}
</style>

