<template>
  <AuthLayout #content>
    <div class="courses-container">
      <div class="courses-content">
        <div class="courses-control-panel">
          <router-link to="/course-creation">
            <Button title="Create Course"></Button>
          </router-link>
        </div>
        <div class="courses-table-container">
          <template>
            <div>
              <b-table hover striped dark :items="courses">
                <template #cell(createdAt)="course">
                  {{ getFormattedDate(course.item.createdAt)}}
                </template>
              </b-table>
            </div>
          </template>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script>
import CourseList from "./../components/CoursesList.vue";
import AuthLayout from "./../Layout/AuthLayout.vue";
import axios from "axios";
import { mapActions } from "vuex";
import Button from "../components/Button.vue";
import { format } from "date-fns-tz";

export default {
  name: "Courses",
  components: {
    CourseList,
    AuthLayout,
    Button,
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
        this.courses = response.data.data;
        this.changeLoadingState();
      } catch (error) {
        this.changeLoadingState();
        this.$swal.fire("unable to  load courses!", "", "error");
        console.error(error);
      }
    },
    getFormattedDate(timeStamp) {
      console.log({courses:this.courses})
      console.log({timeStamp})
      const date = new Date(String(timeStamp));
      const timeZone = "Brazil/Sao_Paulo";
      const pattern = "d/M/yyyy - HH:mm:ss";
      const output = format(date, pattern, { timeZone });
      return output;
    },
  },
};
</script>

<style>
.courses-control-panel {
  width: 100%;
  padding: 1rem;
}
.courses-table-container {
  padding: 2rem;
}
</style>