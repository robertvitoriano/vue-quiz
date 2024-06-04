<template>
  <div class="header-container">
    <div class="header-item">
      <p> Questions: {{ currentQuestionIndex + 1 }}/{{ questionsCount }}</p>
    </div>
    <div class="header-item">
      <p>Time: {{displayedTime}}</p>
    </div>
  </div>
</template>

<script>
import { getFormattedTime } from './../utils/time'

export default {
  props: ['questionsCount', 'currentQuestionIndex', 'score', 'runTimer'],
  data() {
    return {
      currentTimeInSeconds: 0,
      displayedTime: getFormattedTime(0),
      timerId: null,
    }
  },
  mounted() {
    if (this.runTimer) {
      this.startTimer();
    }
  },
  beforeDestroy() {
    this.stopTimer();
  },
  watch: {
    runTimer(newVal) {
      if (newVal) {
        this.startTimer();
      } else {
        this.stopTimer();
        this.$emit('timer-finished', this.currentTimeInSeconds);
      }
    }
  },
  methods: {
    startTimer() {
      this.timerId = setInterval(() => {
        this.currentTimeInSeconds++;
        this.displayedTime = getFormattedTime(this.currentTimeInSeconds);
      }, 1000);
    },
    stopTimer() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    },
  },
}
</script>

<style scoped>
.header-container {
  height: 5vh;
  width: 100%;
  display: flex;
  color: white;
  gap: 4rem;
  align-items: center;
  padding-left: 1rem;
}

p {
  margin-bottom: 0;
}
</style>
