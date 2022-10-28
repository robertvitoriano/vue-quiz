<template>
  <div>
    <div class="course-list-grid" v-if="courses.length">
      <CourseCard v-for="course in courses" :key="course.id" :course="course" />
    </div>
    <h2 v-if="!courses.length" class="no-course-created">You haven't created any course</h2>
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
.no-course-created{
  margin-top: 2rem;
}
</style>
