<template>
  <AuthLayout>
    <template #content>
      <div class="course-creation-wrapper">
        <div class="course-creation-container">
          <div class="course-creation-content">
            <h1 class="course-creation-form-title">Create the course</h1>
            <form class="course-creation-form">
              <input class="course-creation-input" placeholder="Enter course Title">
              <input class="course-creation-input" placeholder="Enter course Type">
              <input class="course-creation-input" placeholder="Enter course Goal">
              <label class="course-creation-file-input-container" role="button" for="course-creation-file-input">
                <input class="course-creation-file-input" id="course-creation-file-input"
                  placeholder="Chose course cover" type="file">
                <b-icon icon="cloud-upload" class="upload-icon"></b-icon>
                <label class="cover-upload-label">Choose course cover image</label>
              </label>
              <div class="question-section-container" v-for="question, questionIndex in questions"
                v-bind:key="questionIndex">
                <h1>Question {{questionIndex + 1}}</h1>
                <div class="question-section-content">
                  <input class="course-creation-input" :placeholder="'enter the question '+(Number(questionIndex) + 1)">
                  <div class="course-creation-input-container">
                    <input class="course-creation-input" v-for="answer, answerIndex in question.answers"
                      v-bind:key="answerIndex" :placeholder="'enter answer ' + (answerIndex + 1)" >
                    <div class=""></div>
                  </div>
                  <div class="add-new-answer-container">
                    <div class="add-new-answer" role="button">
                      <b-icon icon="plus-circle" class="add-question-icon"></b-icon>
                      <span>Add new answer</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add-new-question" role="button">
                <b-icon icon="plus-circle" class="add-question-icon"></b-icon>
                <span>Add new question</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </template>
  </AuthLayout>
</template>
<script>
import AuthLayout from '../Layout/AuthLayout.vue';
export default {
  name: "CourseCreation",
  components: { AuthLayout },
  data() {
    return {
      questions: [{
        title: '',
        answers: [
          {
            isRight: false,
            text: ''
          },
          {
            isRight: false,
            text: ''
          },
          {
            isRight: false,
            text: ''
          }
        ]
      }],
    }
  },
  methods: {
    addQuestionToForm() {

    }
  }
}
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
</style>
