<template>
  <AuthLayout #content>
    <div class="home-container">
      <div class="home-content">
        <GridList :items="courses" v-if="courses.length" />
        <h2 v-else class="no-course-created">You haven't created any course</h2>
      </div>
    </div>
  </AuthLayout>
</template>

<script>
import GridList from "./../components/GridList.vue";
import AuthLayout from "./../Layout/AuthLayout.vue";
import { mapActions } from "vuex";
import courseService from "../services/courseService";
export default {
  name: "Home",
  components: {
    GridList,
    AuthLayout,
  },
  mounted() {
    this.getCourses();
  },
  data() {
    return {
      courses: [
        {
          course_type_id: null,
          cover: null,
          created_at: "",
          goal: 0,
          id: null,
          title: "",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    async getCourses() {
      try {
        this.changeLoadingState();
        const response = await courseService.getCourses()
        const coursesWithPreparedData = response.data.courses.map((course)=>{
          return {
            link:`quiz/${course.id}`,
            image: course.cover || "https://rails-quiz-images.s3.amazonaws.com/course-default.png",
            title:course.title
          }
        })
        this.courses = coursesWithPreparedData;
        this.changeLoadingState()
      } catch (error) {
        this.changeLoadingState();
        this.$swal.fire("unable to  load courses!", "", "error");
        console.error(error)
      }
    },
  },
};
</script>

<style>
.no-course-created{
  margin-top: 2rem;
}
</style>
