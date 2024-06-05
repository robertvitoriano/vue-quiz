<template>
    <div class="wrapper">
      <div v-if="!courseFinished" class="restart-course-section">
      <h1>{{performanceText}}</h1>
      <h3>Do you want to try again ?</h3>
      <div class='restart-buttons-container'>
        <b-button class="restart-button" variant="success" href="#" @click="emitRestart">try again ?</b-button>
        <b-button class="restart-button" href="#" @click="goBack">Go Back</b-button>

        </div>
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
      return `Congratulations, you achieved ${this.score} % !`
    },
    finishCourse() {
      this.courseFinished = true
    },
    goBack() {
            this.$router.go(-1);
        }
  }
}

</script>
<style scoped>
.restart-buttons-container {
  width: 50%;
  display: flex;
  justify-content: space-around;

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
  padding: 2rem;
}
.course-finished-section{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

}
</style>
