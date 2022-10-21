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
              <div class="question-section-container">
                <div class="question-section-content">
                  <input class="course-creation-input" placeholder="enter the question 1">
                  <input class="course-creation-input" placeholder="enter answer 1">
                  <div class="alternative-switch-container course-creation-input">
                  </div>
                  <span>Add answer</span>
                </div>
              </div>
              <div class="question-section-container">
                <div class="question-section-content">
                  <input class="course-creation-input" placeholder="enter the question 1">
                  <input class="course-creation-input" placeholder="enter answer 1">
                  <div class="alternative-switch-container course-creation-input">
                  </div>
                  <span>Add answer</span>
                </div>
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
  components: { AuthLayout }
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
  border: white 1.5px solid;
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: relative;
}

.course-creation-file-input-container:hover {
  background-color: white;
  border-color: black;
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
</style>
