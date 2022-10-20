<template>
  <div class="home-wrapper">
    <div class="home-content">
      <CourseList :courses="courses" />
    </div>
  </div>
</template>

<script>
import CourseList from './../components/CoursesList.vue'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    CourseList
  },
  mounted() {
    this.getCourses()
  },
  data() {
    return {
      courses: []
    }
  },
  methods: {
    async getCourses() {
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/v1/courses`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      this.courses = response.data.data
    }
  }
}
</script>

<style>
.home-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: black;
  color: white;
  height: 100vh;
  overflow-y: scroll;

}

.home-wrapper::-webkit-scrollbar {
  width: 12px;
}

.home-wrapper::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
}

.home-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
 -webkit-box-shadow: inset 0 0 6px white;
}

</style>
