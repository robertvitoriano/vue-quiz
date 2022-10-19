<template>
  <CourseList :courses="courses"/>
</template>

<script>
import CourseList from './../components/CoursesList.vue'
import axios from 'axios'
  export default {
    name: 'Home',
    components:{
      CourseList
    },
    mounted(){
      this.getCourses()
    },
    data(){
      return{
        courses:[]
      }
    },
    methods:{
      async getCourses(){
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/v1/courses`,{
          headers:{
            authorization:'Bearer '+localStorage.getItem('token')
          }
        })
        this.courses = response.data.data
      }
    }
  }
</script>
