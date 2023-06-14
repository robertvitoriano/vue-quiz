<template>
<div class="friends-list-container">
  <div class="avatar-card" v-for=" friend in friends" :key="friend.key">
    <img :src="friend.avatar" width="50px" height="50px">
  </div>
</div>
</template>

<script>
 export default {
  name:'FriendsList',
  props:['friends'],
  mounted(){
  }
 }
</script>

<style escoped >
</style>
