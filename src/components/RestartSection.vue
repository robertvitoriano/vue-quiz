<template>
    <div class="wrapper">
      <div v-if="!courseFinished" class="restart-course-section">
      <h1>{{performanceText}}</h1>
      <h3>Do you want to try again ?</h3>
      <div class='restart-buttons-container'>
        <b-button class="restart-button" variant="danger" href="#" @click="finishCourse">
          finish course
        </b-button>
        <b-button class="restart-button" variant="success" href="#" @click="emitRestart">try again ?</b-button>
        </div>
      </div>
      <div v-if="courseFinished" class="course-finished-section">
        <h1>This is it, I know you did your best!</h1>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    score: Number
  },
  data() {
    return {
      performanceText: '',
      courseFinished: false
    }
  },
  mounted() {
    this.performanceText = this.getPerformanceText()
  },
  methods: {
    emitRestart() {
      this.$emit('restartEvent')
    },
    getPerformanceText() {
      if (this.score === 0) return 'Unfortunately you have not scored, try again, I know you can improve'
      return `Congratulations, you obtained ${this.score} points !`
    },
    finishCourse() {
      this.courseFinished = true
    }
  }
}

</script>
<style scoped>
.restart-buttons-container {
  width: 20%;
  display: flex;
  justify-content: space-between;

}

.wrapper{
  display: flex;
  flex-direction: column;
  height: 60vh;
  background-color: gray;
}
.restart-course-section{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}
.course-finished-section{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

}
</style>