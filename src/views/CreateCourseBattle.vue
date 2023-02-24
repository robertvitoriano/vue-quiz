<template>
  <AuthLayout>
    <template #content>
      <div class="course-battle-room-wrapper">
        <div class="course-battle-creation-container" >
          <TextInput v-model="courseBattleName" placeholder="Enter course battle name" class="course-battle-input"></TextInput>
          <span>Select your course battle</span>
          <Select
          :options="courses"
          @optionSelected="handleSelectedCourse"
          class="courses-select"
          ></Select>
          <img :src="selectedCourse.cover" v-if="selectedCourse" class="course-cover-image">
          <Button title="Create course battle" />
        </div>
      </div>
    </template>
  </AuthLayout>
</template>
<script>
import { mapGetters } from "vuex";
import AuthLayout from "../Layout/AuthLayout.vue";
import Select from "../components/Form/Select.vue";
import courseService from "../services/courseService";
import TextInput from "../components/Form/TextInput.vue";
import Button from "../components/Button.vue";
export default {
  name:"CourseBatleRooom",
  components:{AuthLayout, Select, TextInput, Button},
  data() {
    return {
      selectedCourse: {
        label:'',
        id:'',
        cover:''
      },
      courseBattleName:"",
      courses:[{
        label:'',
        id:'',
        cover:''
      }]
    };
  },
  mounted(){
    this.loadCourses()
  },
  methods: {
    handleSelectedCourse(course){
      this.selectedCourse = course
    },
    async loadCourses(){
      const response = await courseService.getCourses();
      const courses = response.data.courses.map(({cover, title, id})=>({id, cover, label:title}));
      this.courses = courses;
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style scoped>
.course-battle-room-wrapper{
  width: 100%;
  height: 100%;
}

.course-battle-creation-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.course-course-battle{

}
.course-battle-content {
  padding: 2rem;
}
.courses-select{
  border-top: none;
  border-right: none;
  border-left: none;
  border-color: white;
  outline: none;
  color: black;
  width: 30%;
  text-align: center;
  margin-top: 1rem;
}
.courses-select :hover{
  cursor: pointer;
}
.course-battle-input{
  width: 30%;
}

.course-cover-image{
  margin: 20px;
  width:30%;
}

</style>
