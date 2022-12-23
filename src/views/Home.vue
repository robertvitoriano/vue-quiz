<template>
  <AuthLayout #content>
    <div class="home-container">
      <div class="home-content">
        <CourseList :courses="courses" v-if="courses.length" />
      </div>
    </div>
  </AuthLayout>
</template>

<script>
import CourseList from "./../components/CoursesList.vue";
import AuthLayout from "./../Layout/AuthLayout.vue";
import { mapActions } from "vuex";
import courseService from "../services/courseService";
export default {
  name: "Home",
  components: {
    CourseList,
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
        this.courses = response.data.courses;
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

<style></style>
