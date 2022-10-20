<template>
  <div class="course-grid">
    <CourseCard v-for="course in courses" :key="course.title" :course ="course"/>
  </div>
</template>

<script>
import CourseCard from './CourseCard.vue'
export default {
  name: 'CoursesList',
  components: {
    CourseCard
  },
  props: ['courses']
}
</script>
<style scoped>
  .course-grid {
    display:grid;
    grid-template-columns:30% 30% 30%;
  }
</style>
