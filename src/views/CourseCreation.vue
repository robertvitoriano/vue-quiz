<template>
  <AuthLayout>
    <template #content>
      <div class="course-creation-wrapper">
        <div class="course-creation-container">
          <div class="course-creation-content">
            <h1 class="course-creation-form-title">Create the course</h1>
            <form class="course-creation-form">
              <input
                class="course-creation-input"
                placeholder="Enter course Title"
                v-model="course.title"
              />
              <input
                class="course-creation-input"
                placeholder="Enter course Goal"
                v-model="course.goal"
              />
              <label
                class="course-creation-file-input-container"
                role="button"
                for="course-creation-file-input"
              >
                <input
                  class="course-creation-file-input"
                  id="course-creation-file-input"
                  placeholder="Chose course cover"
                  type="file"
                  @change="handleCoverInput($event)"
                  ref="coverInput"
                />
                <b-icon icon="cloud-upload" class="upload-icon"></b-icon>
                <label class="cover-upload-label">{{
                  course.cover ? "image selected" : "Choose course cover image"
                }}</label>
              </label>
              <v-select
                class="course-creation-select"
                :options="courseTypes"
                v-model="course.courseType"
              ></v-select>
              <div
                class="question-section-container"
                v-for="(question, questionIndex) in course.questions"
                v-bind:key="questionIndex"
              >
                <h1>Question {{ questionIndex + 1 }}</h1>
                <div class="question-section-content">
                  <input
                    class="course-creation-input"
                    :placeholder="
                      'enter the question ' + (Number(questionIndex) + 1)
                    "
                    v-model="question.text"
                  />
                  <div class="course-creation-answers-container">
                    <div
                      class="course-answer-container"
                      v-for="(
                        alternative, alternativeIndex
                      ) in question.alternatives"
                      v-bind:key="alternativeIndex"
                    >
                      <input
                        class="course-creation-input"
                        :placeholder="'enter answer ' + (alternativeIndex + 1)"
                        v-model="alternative.text"
                      />
                      <div class="wrong-right-switch">
                        <div
                          :class="{
                            'wrong-right-switch-input-container': true,
                            'wrong-right-input-selected': alternative.isRight,
                          }"
                          @click="
                            changeWrongRightSwitch({
                              questionIndex,
                              alternativeIndex,
                            })
                          "
                        >
                          <label for="">right</label>
                          <input
                            type="radio"
                            name="wrong-right"
                            value="right"
                            :checked="alternative.isRight"
                            class="wrong-right-switch-input"
                          />
                        </div>
                        <div
                          :class="{
                            'wrong-right-switch-input-container': true,
                            'wrong-right-input-selected': !alternative.isRight,
                          }"
                          @click="
                            changeWrongRightSwitch({
                              questionIndex,
                              alternativeIndex,
                            })
                          "
                        >
                          <label for="">wrong</label>
                          <input
                            type="radio"
                            name="wrong-right"
                            value="wrong"
                            :checked="!alternative.isRight"
                            class="wrong-right-switch-input"
                          />
                        </div>
                      </div>
                    </div>
                    <div class=""></div>
                  </div>
                  <div class="add-new-answer-container">
                    <div
                      class="add-new-answer"
                      role="button"
                      @click="addAnswerToForm(questionIndex)"
                    >
                      <b-icon
                        icon="plus-circle"
                        class="add-question-icon"
                      ></b-icon>
                      <span>Add new answer</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="add-new-question"
                role="button"
                @click="addQuestionToForm"
              >
                <b-icon icon="plus-circle" class="add-question-icon"></b-icon>
                <span>Add new question</span>
              </div>
            </form>
          </div>
          <Button class="create-course-button" @click="createCourse"
            >Create Course</Button
          >
        </div>
      </div>
    </template>
  </AuthLayout>
</template>
<script>
import AuthLayout from "../Layout/AuthLayout.vue";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "CourseCreation",
  components: { AuthLayout },
  data() {
    return {
      course: {
        title: "",
        goal: "",
        cover: null,
        courseType: {
          id: "",
          label: "",
        },
        questions: [
          {
            text: "",
            alternatives: [
              {
                isRight: false,
                text: "",
              },
            ],
          },
        ],
      },
      courseTypes: [
        {
          id: "",
          title: "",
        },
      ],
      isLoading: false,
    };
  },
  mounted() {
    this.getCourseTypes();
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    addQuestionToForm() {
      this.course.questions.push({
        title: "",
        alternatives: [
          {
            text: "",
            isRight: false,
          },
        ],
      });
    },
    addAnswerToForm(questionIndex) {
      console.log({ questionIndex });
      this.course.questions[questionIndex].alternatives.push({
        text: "",
        isRight: false,
      });
    },
    changeWrongRightSwitch({ questionIndex, alternativeIndex }) {
      this.course.questions[questionIndex].alternatives[
        alternativeIndex
      ].isRight =
        !this.course.questions[questionIndex].alternatives[alternativeIndex]
          .isRight;
    },
    handleCoverInput(event) {
      this.course.cover = event.target.files[0];
    },
    async getCourseTypes() {
      try {
        this.changeLoadingState();
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/v1/course_types`,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.courseTypes = response.data.data.map((courseType) => {
          return {
            id: courseType.id,
            label: courseType.title,
          };
        });
        this.changeLoadingState();
      } catch (error) {
        console.error(error);
        this.changeLoadingState();
        this.$swal.fire("unable to load course types!", "", "error");
      }
    },
    async createCourse() {
      const { courseType, cover, ...rest } = this.course;
      const course = { courseTypeId: courseType.id, ...rest };
      const formData = new FormData();
      formData.append("cover", cover);
      formData.append("course", JSON.stringify(course));
      this.changeLoadingState();
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/api/v1/courses`,
          formData,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          this.changeLoadingState();
          this.$swal.fire("Course sucessfully created!", "", "success");
          this.course = {
            title: "",
            goal: "",
            cover: null,
            courseType: {
              id: "",
              label: "",
            },
            questions: [
              {
                text: "",
                alternatives: [
                  {
                    isRight: false,
                    text: "",
                  },
                ],
              },
            ],
          };
        }
      } catch (error) {
        console.error(error);
        this.$swal.fire("Error creating the course", "", "error");
        this.changeLoadingState();
      }
    },
  },
};
</script>

<style>
.course-creation-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.course-creation-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.course-creation-content {
  border: aliceblue 3px solid;
  border-radius: 1rem;
  padding-bottom: 1.5rem;
  width: 40%;
  height: 80%;
  overflow-y: scroll;
}

.course-creation-form {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
}

.course-creation-input {
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: transparent;
  border-color: white;
  outline: none;
  color: white;
  width: 100%;
  text-align: center;
  height: 3rem;
}

.course-creation-answers-container {
  position: relative;
  display: flex;
  flex-direction: column;
}

.course-answer-container {
  position: relative;
}

.course-creation-file-input {
  opacity: 0;
  width: 100%;
  position: absolute;
}

.course-creation-file-input:hover {
  cursor: pointer;
}

.course-creation-file-input-container {
  background-color: transparent;
  border: white 2px solid;
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: relative;
}

.course-creation-file-input-container:hover {
  background-color: white;
  border: black 2px solid;
  color: black;
  cursor: pointer;
}

.cover-upload-label:hover {
  text-decoration: underline;
  cursor: pointer;
}

.upload-icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;
}

.upload-icon:hover {
  cursor: pointer;
}

.course-creation-form-title {
  text-decoration: underline;
  text-align: center;
}

.question-section-content {
  margin-top: 1.5rem;
  border: solid white 2px;
}

.question-section-container {
  width: 100%;
  margin-top: 2rem;
}

.add-new-question {
  border: 2px solid white;
  padding: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 12rem;
  margin-top: 2rem;
}

.add-new-question:hover {
  cursor: pointer;
  color: black;
  background-color: white;
}

.add-new-answer {
  border: 2px solid white;
  padding: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 10rem;
  margin: 0 auto;
}

.add-new-answer:hover {
  cursor: pointer;
  color: black;
  background-color: white;
}

.add-new-answer-container {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.add-question-icon {
}

.wrong-right-switch {
  position: absolute;
  right: 0;
  top: 1rem;
  border: solid 2px white;
  display: flex;
}

.wrong-right-switch-container {
  display: flex;
  justify-content: center;
}

.wrong-right-switch:hover {
  cursor: pointer;
}

.wrong-right-input-selected {
  background-color: white;
  color: black;
}

.wrong-right-switch-input {
  opacity: 0;
}

.create-course-button {
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 1rem;
  margin-top: 1rem;
}

.create-course-button:hover {
  background-color: white;
  color: black;
}

.course-creation-select {
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: white;
  border-color: white;
  outline: none;
  color: black;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
}

* {
  --vs-controls-color: white;
  --vs-border-color: white;
  --vs-dropdown-bg: black;
  --vs-dropdown-color: white;
  --vs-dropdown-option-color: white;
  --vs-selected-bg: white;
  --vs-selected-color: white;
  --vs-search-input-bg: black;
  --vs-search-input-color: white;
  --vs-dropdown-option--active-bg: white;
  --vs-dropdown-option--active-color: black;
}
</style>
