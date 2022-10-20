<template>
  <div class="course-wrapper">
    <h1 class="course-title">{{course.title}}</h1>
    <div class="course-container" ref="courseContainer" :style="cardStyle">

    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseCard',
  props: ['course'],
  data() {
    return {
      cardStyle: {
        'background-image': 'url(' + this.course.cover + ')',
        'background-position':'center',
        'background-repeat':'no-repeat',
        'background-size':'cover'
      }
    }
  },
  mounted() {

  }
}
</script>
<style scoped>
.course-container {
  width: 300px;
  height: 300px;
}
.course-title{
  cursor: pointer;
}
.course-title:hover{
  text-decoration: underline;
}
</style>
