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
              <label>Show:</label>
              <v-select
                :options="[2, 10, 20, 30, 40, 50, 60, 70, 80, 100, 200, 300]"
                v-model="coursesPerPage"
                @option:selected="handleSelectCoursesPerPage"
              ></v-select>
              <b-table
              hover
              striped
              dark
              responsive
              :items="courses"
              id="courses-table"
              @row-clicked="navigateToCourseUpdate"
              >
                <template #cell(createdAt)="course">
                  {{ getFormattedDate(course.item.createdAt) }}
                </template>
                <template #cell(updatedAt)="course">
                  {{ getFormattedDate(course.item.updatedAt) }}
                </template>
              </b-table>
              <b-pagination
                v-model="currentPage"
                :total-rows="coursesTotal"
                :per-page="coursesPerPage"
                aria-controls="courses-table"
                dark
                @change="getCourses($event)"
              ></b-pagination>
            </div>
          </template>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script>
import AuthLayout from "./../Layout/AuthLayout.vue";
import axios from "axios";
import { mapActions } from "vuex";
import Button from "../components/Button.vue";
import { format } from "date-fns-tz";

export default {
  name: "Courses",
  components: {
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
      coursesPerPage: 10,
      currentPage: 1,
      coursesTotal: 0,
      coursesOrder: "desc",
    };
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    async getCourses(paginationPage) {
      if (paginationPage) this.currentPage = paginationPage;
      try {
        this.changeLoadingState();
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/v1/courses?page=${this.currentPage}&limit=${this.coursesPerPage}&order=${this.coursesOrder}`,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.courses = response.data.data.courses;
        this.coursesTotal = response.data.data.total;
        this.changeLoadingState();
      } catch (error) {
        this.changeLoadingState();
        this.$swal.fire("unable to  load courses!", "", "error");
        console.error(error);
      }
    },
    getFormattedDate(timeStamp) {
      const date = new Date(String(timeStamp));
      const timeZone = "Brazil/Sao_Paulo";
      const pattern = "d/M/yyyy - HH:mm:ss";
      const output = format(date, pattern, { timeZone });
      return output;
    },
    async handleSelectCoursesPerPage() {
      this.currentPage = 1;
      await this.getCourses();
    },
    navigateToCourseUpdate(course){
      console.log({dataCliked:course})
      this.$router.push(`/course-update/${course.id}`)
    }
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
