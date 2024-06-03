<template>
  <AuthLayout #content>
    <div class="home-container">
      <div class="home-content">
        <GridList :items="courseBattles" v-if="courseBattles.length" />
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
      courseBattles: [
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
        const response = await courseService.getUserCourseBattles()
        console.log(response.data)
        const coursesWithPreparedData = response.data.data.courseBattles.map((courseBattle)=>{
          return {
            link:`course-battle-room/${courseBattle.id}`,
            image: courseBattle.cover || "https://rails-quiz-images.s3.amazonaws.com/course-default.png",
            title:courseBattle.name
          }
        })
        this.courseBattles = coursesWithPreparedData;
        this.changeLoadingState()
      } catch (error) {
        this.changeLoadingState();
        this.$swal.fire("unable to  load Course Battles!", "", "error");
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
