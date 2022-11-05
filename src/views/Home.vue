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
import axios from "axios";
import { mapActions } from "vuex";
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
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/v1/courses`,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.courses = response.data.data.courses;
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
