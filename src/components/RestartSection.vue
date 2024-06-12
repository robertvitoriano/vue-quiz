<template>
  <div class="wrapper">
    <div v-if="!courseFinished" class="restart-course-section">
      <div class="course-title-wrapper">
        <p class="course-title">Quiz: {{ courseTitle }}</p>
      </div>
      <img class="result-icon" :src="getResultIcon()" />
      <h1 class="performance-text">{{ performanceText }}</h1>
      <div class="player-result-columns">
        <div class="player-result-column" v-for="player in players" :key="player.id">
          <img class="player-avatar"
            :src="player.avatar || 'https://rails-quiz-images.s3.amazonaws.com/default-avatar.png'" />
          <h3 class="player-name">{{ player.name }}</h3>
          <div class="player-course-status">
            <h3>Score: {{ score }}%</h3>
            <h3>Time: 00:20:52</h3>
          </div>
        </div>
      </div>
      <div class='restart-buttons-container'>
        <div class="go-back-button-container">
          <div class="go-back-button-wrapper">
            <img src="./../assets/go-back-button.png" class="go-back-button-image" />
          </div>
          <h3 class="restart-button" href="#" @click="goBack">Go Back</h3>
        </div>
        <div class="restart-button-container">
          <img src="./../assets/replay-icon.png" class="replay-button-image" />
          <h3 class="restart-button" href="#" @click="goBack">Ask for Replay ?</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    score: Number,
    result: String,
    courseTitle: String,
    players: Array
  },
  data() {
    return {
      performanceText: '',
      courseFinished: false,
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
      const resultTexts = {
        'not-finished': "Error, You haven't finished the course!",
        'won': "YOU WON!",
        'lost': "YOU LOST",
        'awaiting-opponent': 'Awaiting opponent to finish battle!',
        'draw': 'There was a draw in this battle!'
      }

      return resultTexts[this.result];
    },
    getResultIcon() {
      const resultIcons = {
        'not-finished': require('./../assets/lost-icon.jpeg'),
        'won': require('./../assets/win-icon.jpeg'),
        'lost': require('./../assets/lost-icon.jpeg'),
        'awaiting-opponent': require('./../assets/lost-icon.jpeg'),
        'draw': require('./../assets/lost-icon.jpeg')
      };
      return resultIcons[this.result];
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
.player-course-status {
  margin-top: 1rem;
}
.go-back-button-wrapper{
  padding: 1rem;
  background-color: #3b3b3b;
  margin-bottom: 1rem;
  border-radius: 50%;
}
.go-back-button-container{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.restart-button-container{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.go-back-button-image{
  width: 55px;
  height: 55px;
  border-radius: 50%;
}
.replay-button-image{
  width: 85px;
  height: 85px;
  border-radius: 50%;
  margin-bottom: 1rem;

}
.performance-text {
  font-size: 3rem;
}

.result-icon {
  width: 85px;
  height: 85px;
  border-radius: 50%;
}

.restart-buttons-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 60vh;
  background-color: black;
}

.course-title {
  margin: 0;
  font-size: 2rem;
}

.course-title-wrapper {
  background-color: #3b3b3b;
  color: white;
  padding: 1rem;
  border-radius: 1rem;
}

.restart-course-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
}

.course-finished-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.player-name {
  text-align: center;
}

.player-avatar {
  width: 131px;
  height: 131px;
  border-radius: 50%;
}

.player-result-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.player-result-columns {
  display: flex;
  gap: 2rem;
}

@media only screen and (min-width: 725px) {
  .restart-buttons-container {
    width: 50%;
  }

}
</style>
