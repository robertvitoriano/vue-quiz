<template>
  <div>
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
