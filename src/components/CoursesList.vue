<template>
  <div>
    <div class="course-list" v-if="courses.length">
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


@media (min-width: 280px) {
  .course-list {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .course-list {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: auto;
    column-gap: 7rem;
    row-gap: 13rem;
    height: 500px;
  }
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {}
.no-course-created{
  margin-top: 2rem;
}
</style>
