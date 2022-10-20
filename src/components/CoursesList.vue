<template>
    <div class="course-list-grid">
      <CourseCard v-for="course in courses" :key="course.title" :course="course" />
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
.course-list-grid {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  grid-template-rows: auto;
  column-gap: 7rem;
  row-gap: 13rem;
  height: 500px;
}
</style>
