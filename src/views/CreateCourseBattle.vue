<template>
  <AuthLayout>
    <template #content>
      <div class="course-battle-room-wrapper">
        <router-link to="/course-creation">
          <Button title="Create Course" class="course-creation-button" ></Button>
        </router-link>
        <div class="course-battle-creation-container">
          <Select :options="courses" @optionSelected="handleSelectedCourse" class="courses-select"
            label="Select the battle course"></Select>
          <img :src="selectedCourse.cover" v-if="selectedCourse" class="course-cover-image">
          <Button title="Create course battle" @clicked="createCourseBattle" />
        </div>
      </div>
    </template>
  </AuthLayout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AuthLayout from "../Layout/AuthLayout.vue";
import Select from "../components/Form/Select.vue";
import courseService from "../services/courseService";
import TextInput from "../components/Form/TextInput.vue";
import Button from "../components/Form/Button.vue";
export default {
  name: "CourseBatleRooom",
  components: { AuthLayout, Select, TextInput, Button },
  data() {
    return {
      selectedCourse: {
        label: '',
        id: '',
        cover: ''
      },
      courses: [{
        label: '',
        id: '',
        cover: ''
      }]
    };
  },
  mounted() {
    this.loadCourses()
  },
  methods: {
    ...mapActions(["changeLoadingState", "setSelectedCourse"]),
    handleSelectedCourse(course) {
      this.selectedCourse = course
    },
    async loadCourses() {
      this.changeLoadingState()
      const response = await courseService.getCourses();
      this.changeLoadingState()
      const courses = response.data.courses.map(({ cover, title, id }) => ({
        id,
        cover: cover || 'https://rails-quiz-images.s3.amazonaws.com/course-default.png',
        label: title
      }));
      this.courses = courses;
    },
    async createCourseBattle() {
      this.changeLoadingState()
      const response = await courseService.createCourseBattle({ courseId: this.selectedCourse.id, userId: this.userInfo.id })
      const createCourseBattleId = response.data.data.courseBattle.id
      this.setSelectedCourse(this.selectedCourse);
      this.changeLoadingState()
      this.$router.push("/course-battle-room/" + createCourseBattleId);
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style scoped>
.course-creation-button {
  margin: 0 auto;
  margin-top: 2rem;
  width: fit-content;
}
.course-battle-room-wrapper {
  width: 100%;
  height: 100%;
}

.course-battle-creation-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.course-battle-content {
  padding: 2rem;
}

.courses-select {
  border-top: none;
  border-right: none;
  border-left: none;
  border-color: white;
  outline: none;
  color: black;
  text-align: center;
  margin-top: 1rem;
}

.courses-select :hover {
  cursor: pointer;
}

.course-cover-image {
  margin: 20px;
  width: 30%;
}

@media (min-width: 280px) {
  .course-battle-input {
    width: 70vw;
  }

  .courses-select {
    width: 60vw;
  }
}

@media (min-width: 992px) {
  .course-battle-input {
    width: 30vw;
  }

  .courses-select {
    width: 30vw;
  }
}
</style>
