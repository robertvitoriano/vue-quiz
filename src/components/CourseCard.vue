<template>
  <div class="course-wrapper">
    <div class="course-content">
      <router-link :to="'quiz/'+course.id" class="course-title">
        {{course.title}}
      </router-link>
      <router-link :to="'quiz/'+course.id">
        <div class="course-container" ref="courseContainer" :style="cardStyle"></div>
      </router-link>
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
        'background-image': 'url(' + encodeURI(this.course.cover)  + ')',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
      }
    }
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
  color:white;
  font-size:2rem;
  text-decoration: none;
}
.course-title:hover{
  text-decoration: underline;
}
</style>
