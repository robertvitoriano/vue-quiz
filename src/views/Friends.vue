<template>
  <AuthLayout #content :pageTitle="'Friends'">
    <GridList :items ="friends"/>
  </AuthLayout>
</template>

<script>
import AuthLayout from '../Layout/AuthLayout.vue';
import GridList from '../components/GridList.vue';
import  userService from '../services/userService'
 export default {
  name:'Friends',
  components:{AuthLayout, GridList},
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
      const friendsWithPreparedData = response.data.data.map((friend) =>{
        return {
          image:friend.avatar,
          title:friend.name,
          link:''
        }
      })
      this.friends = friendsWithPreparedData
    }
  }
 }
</script>

<style>
</style>
