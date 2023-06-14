<template>
  <AuthLayout #content>
    <FriendsList :friends="friends"/>
  </AuthLayout>
</template>

<script>
import AuthLayout from '../Layout/AuthLayout.vue';
import FriendsList from '../components/FriendsList.vue';
import  userService from '../services/userService'
 export default {
  name:'Friends',
  components:{AuthLayout, FriendsList},
  data(){
    return{
      friends:[],
      userService: userService
    }
  },
  mounted(){
    this.getFriends()
  },
  methods:{
    async getFriends(){
      const response = await this.userService.getFriends(this.$route.params.userId)
      this.friends = response.data.data
    }
  }
 }
</script>

<style>
</style>
