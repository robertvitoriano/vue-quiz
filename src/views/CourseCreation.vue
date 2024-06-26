<template>
  <AuthLayout>
    <template #content>
      <div class="course-creation-wrapper">
        <div class="course-creation-container">
          <div class="course-creation-content">
            <h1 class="course-creation-form-title">
              {{ isUpdating ? "Update Course" : "Create the course" }}
            </h1>
            <form class="course-creation-form">
              <input class="course-creation-input" placeholder="Enter course Title" v-model="course.title" />
              <input class="course-creation-input" placeholder="Enter course Goal" v-model="course.goal" />
              <label class="course-creation-file-input-container" role="button" for="course-creation-file-input">
                <input class="course-creation-file-input" id="course-creation-file-input"
                  placeholder="Chose course cover" type="file" @change="handleCoverInput($event)" ref="coverInput" />
                <b-icon icon="cloud-upload" class="upload-icon"></b-icon>
                <label class="cover-upload-label">{{
                  course.cover && isUpdating
                    ? "Change Cover"
                    : course.cover
                      ? "Image Selected"
                      : "Select Cover"
                }}</label>
              </label>
              <img class="course-cover-image" v-if="isUpdating && !updatedCover && course.cover" :src="course.cover"
                alt="course cover" />
              <v-select class="course-creation-select" :options="courseTypes" v-model="course.courseType"></v-select>
              <div class="question-section-container" v-for="(question, questionIndex) in course.questions"
                v-bind:key="questionIndex">
                <h1>Question {{ questionIndex + 1 }}
                  <b-icon icon="trash-fill" class="delete-icon" @click="removeQuestion(questionIndex)"></b-icon>
                </h1>
                <div class="question-section-content">
                  <input class="course-creation-input" :placeholder="'enter the question ' + (Number(questionIndex) + 1)
                    " v-model="question.text" />
                  <div class="course-creation-answers-container">
                    <div class="course-answer-container" v-for="(
                        alternative, alternativeIndex
                      ) in question.alternatives" v-bind:key="alternativeIndex">
                      <input :class="{
                        'course-creation-input': true,
                        'input-error': alternativeNotFilledErrorInfo.questionIndex === questionIndex &&
                          alternativeNotFilledErrorInfo.alternativeIndex === alternativeIndex && !alternative.text
                      }" :placeholder="'enter answer ' + (alternativeIndex + 1)" v-model="alternative.text" />
                      <div class="wrong-right-switch">
                        <div :class="{
                          'wrong-right-switch-input-container': true,
                          'wrong-right-input-selected': alternative.isRight,
                        }" @click="
                          changeWrongRightSwitch({
                            questionIndex,
                            alternativeIndex,
                          })
                          ">
                          <label for="">right</label>
                          <input type="radio" name="wrong-right" value="right" :checked="alternative.isRight"
                            class="wrong-right-switch-input" />
                        </div>
                        <div :class="{
                          'wrong-right-switch-input-container': true,
                          'wrong-right-input-selected': !alternative.isRight,
                        }" @click="
                          changeWrongRightSwitch({
                            questionIndex,
                            alternativeIndex,
                          })
                          ">
                          <label for="">wrong</label>
                          <input type="radio" name="wrong-right" value="wrong" :checked="!alternative.isRight"
                            class="wrong-right-switch-input" />
                        </div>
                      </div>
                    </div>
                    <div class=""></div>
                  </div>
                </div>
              </div>
              <div class="add-new-question" role="button" @click="addQuestionToForm">
                <b-icon icon="plus-circle" class="add-question-icon"></b-icon>
                <span>Add new question</span>
              </div>
            </form>
          </div>
          <Button class="create-course-button" @click="handleSubmit">{{
            isUpdating ? "Update Course" : "Create Course"
          }}</Button>
        </div>
      </div>
    </template>
  </AuthLayout>
</template>
<script>
import AuthLayout from "../Layout/AuthLayout.vue";
import { mapActions } from "vuex";
import courseService from './../services/courseService'

export default {
  name: "CourseCreation",
  components: { AuthLayout },
  data() {
    return {
      course: {
        title: "",
        goal: "",
        cover: null,
        oldCover: null,
        courseType: {
          id: "",
          label: "",
        },
        questions: [
          {
            text: "",
            new: false,
            alternatives: [
              {
                isRight: false,
                text: "",
                new: false
              },
              {
                isRight: false,
                text: "",
                new: false
              }, {
                isRight: false,
                text: "",
                new: false
              }, {
                isRight: false,
                text: "",
                new: false
              }, {
                isRight: false,
                text: "",
                new: false
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
      isUpdating: false,
      updatedCover: false,
      deletedQuestions: [],
      deletedAlternatives: [],
      alternativeNotFilledErrorInfo: {
        questionIndex: null,
        alternativeIndex: null
      }
    };
  },
  mounted() {
    this.getCourseTypes();
    if (this.$route.path.includes("/course-update")) {
      this.isUpdating = true;
      this.loadCourse();
    }
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    addQuestionToForm() {
      this.course.questions.push({
        text: "",
        new: true,
        alternatives: [
              {
                isRight: false,
                text: "",
                new: false
              },
              {
                isRight: false,
                text: "",
                new: false
              }, {
                isRight: false,
                text: "",
                new: false
              }, {
                isRight: false,
                text: "",
                new: false
              }, {
                isRight: false,
                text: "",
                new: false
              },
            ],
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
      this.updatedCover = true;
    },
    async getCourseTypes() {
      try {
        this.changeLoadingState();
        const response = await courseService.getCourseTypes();
        this.courseTypes = response.data.map((courseType) => {
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
    async handleSubmit() {
      for (const [questionIndex, question] of this.course.questions.entries()) {
        for (const [alternativeIndex, alternative] of question.alternatives.entries()) {
          if (!alternative.text) {
            this.alternativeNotFilledErrorInfo.alternativeIndex = alternativeIndex;
            this.alternativeNotFilledErrorInfo.questionIndex = questionIndex;

            this.$swal.fire(
              `You should fill all 5 alternatives`,
              "",
              "error"
            );
            return;
          }
        }
      }

      const { courseType, cover, ...rest } = this.course;
      const course = { courseTypeId: courseType.id, ...rest };
      const formData = new FormData();

      if (this.updatedCover) formData.append("cover", cover);
      formData.append("course", JSON.stringify(course));
      this.changeLoadingState();
      try {

        const swalResult = await this.$swal.fire({
          title: `Do you really want to ${this.isUpdating ? "update" : "create"} this course ?`,
          showDenyButton: true,
          confirmButtonText: this.isUpdating ? "Update!" : "Create!",
          denyButtonText: "Cancel"
        });

        if (!swalResult.isConfirmed) return

        let response;
        if (this.isUpdating) {
          formData.append("deletedQuestionIds", JSON.stringify(this.deletedQuestions))

          response = await courseService.updateCourse(this.$route.params.id, formData);
        } else {
          response = await courseService.createCourse(formData);
        }
        if (response.status === 200) {
          this.changeLoadingState();
          this.$swal.fire(
            `Course sucessfully ${this.isUpdating ? "updated" : "created"}`,
            "",
            "success"
          );
          if (this.isUpdating) {
            await this.loadCourse()
            return
          }
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
                new: false,
                alternatives: [
                  {
                    isRight: false,
                    text: "",
                    new: false
                  },
                  {
                    isRight: false,
                    text: "",
                    new: false
                  }, {
                    isRight: false,
                    text: "",
                    new: false
                  }, {
                    isRight: false,
                    text: "",
                    new: false
                  }, {
                    isRight: false,
                    text: "",
                    new: false
                  },
                ],
              },
            ],
          };
        }
      } catch (error) {
        console.error(error);
        this.$swal.fire(`Error ${this.isUpdating ? "updating" : "creating!"} the course`, "", "error");
        this.changeLoadingState();
      }
    },
    async loadCourse() {
      this.changeLoadingState();

      const response = await courseService.getCourseById(this.$route.params.id);
      const course = response.data.course;
      const questions = response.data.questions;
      const courseType = response.data.courseType[0];
      this.course = {
        ...this.course,
        ...course,
        oldCover: course.cover,
        questions,
        courseType: {
          label: courseType.title,
          id: courseType.id,
        },
      };
      this.changeLoadingState();
    },
    removeQuestion(questionIndex) {
      if (this.isUpdating) {
        this.deletedQuestions.push(this.course.questions[questionIndex].id)
      }
      this.course.questions = this.course.questions.filter((_, index) => index !== questionIndex)
    },
  },
};
</script>

<style scoped>
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
  height: 4rem;
}

.input-error {
  border-color: red;
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

.add-question-icon {}

.wrong-right-switch {
  position: absolute;
  right: 0;
  top: 1.5rem;
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

.course-cover-image {
  width: 20%;
}

.delete-icon {
  color: red;
  font-size: 2rem;
  cursor: pointer;
}

.delete-alternative-icon {
  font-size: 1rem;
  position: absolute;
  top: 0.2rem;
  right: 0.3rem;
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

@media only screen and (max-width: 900px) {
  .course-creation-content {
    width: 95%;
  }
}
</style>
