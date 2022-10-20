<template>
  <div class="course-wrapper">
    <div class="course-content">
      <h1 class="course-title">{{course.title}}</h1>
      <div class="course-container" ref="courseContainer" :style="cardStyle"></div>
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
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
      }
    }
  },
  mounted() {

  }
}
</script>
<style scoped>

.course-wrapper {
  height: 100px;
}
.course-container {
  width: 250px;
  height: 250px;
}

.course-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.course-title {
  cursor: pointer;
}

.course-title:hover {
  text-decoration: underline;
}
</style>
