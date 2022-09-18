<template>
  <div class="question-box-container">
    <b-jumbotron class="question-box-content">
      <div class="question-container">
        <div class="question-section">
          <p>{{currentQuestion.question}}</p>
        </div>
        <div class="alternatives-section">
          <b-list-group class="alternatives-list">
            <b-list-group-item :class="{
             selected:selectedAnswer === alternative,
             alternative:true 
            }" :key="alternative" v-for="alternative in currentQuestion.alternatives"
              @click="selectAnswer(alternative)">{{alternative}}</b-list-group-item>
          </b-list-group>

        </div>
      </div>
      <div class="question-box-buttons-container">
        <b-button variant="primary" href="#" :disabled = 'disableSubmitButton' @click="handleSubmit">{{submitButtonText}}
        </b-button>
        <b-button variant="success" href="#" @click="emitNextQuestionEvent">{{nextButtonText}}</b-button>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  props: {
    currentQuestion: Object,
    currentQuestionIndex:Number,
    questionsCount:Number
  },
  data() {
    return {
      selectedAnswer: '',
      hasAnswered:false,
      submitButtonText:'Save Answer',
      nextButtonText:'Next Question',
      disableSubmitButton:false
    }
  },
  methods: {
    emitNextQuestionEvent() {
      if(!this.hasAnswered) return  alert('You have to answer !')

      if(this.currentQuestionIndex + 2  === this.questionsCount){
        this.nextButtonText = "Finish Quiz"
      }
      if(this.currentQuestionIndex + 1  === this.questionsCount){
        this.$emit('hasFinishedEvent')
      }
      this.$emit('nextQuestionEvent')
      this.resetAnswerState()
    },
    handleSubmit() {
      if (this.selectedAnswer === this.currentQuestion.correct_answer) {
        alert("You got it right")
        this.$emit('increaseScoreEvent')
      } else {
        alert("You got it wrong")
      }
      this.submitButtonText = 'Answered'
      this.disableSubmitButton = true
      this.hasAnswered = true
    },
    selectAnswer(answer) {
     if(!this.hasAnswered){
       this.selectedAnswer = answer
     }
    },
    resetAnswerState(){
      this.submitButtonText = 'Save Answer'
      this.disableSubmitButton = false
      this.hasAnswered = false
    }
  }
}
</script>

<style scoped>
.question-box-content {
  height: 60vh;
  display: flex;
  flex-direction: column;
  background-color: lightgray;
  align-items: center;
  justify-content: center
}

.question-container {
  background-color: white;
  margin-bottom: 20px;
  width: 80%;
  height: 80%;
  border: 4px black solid;
  border-radius: 15px;
}

.alternatives-section {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  height: 50%;
  border-top: 1px solid black;
  overflow: auto;
}

.alternatives-section::-webkit-scrollbar {
  width: 10px;
}

.alternatives-section::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.alternatives-section::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 10px;
}

.alternatives-section::-webkit-scrollbar-thumb:hover {
  opacity: 30%;
}

.question-section {
  height: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.question-box-buttons-container {
  width: 20%;
  display: flex;
  justify-content: space-between;
}

.selected {
  background-color: aqua;
}

.alternative {
  cursor: pointer;
}

@media only screen and (max-width: 600px) {

  /*Big smartphones [426px -> 600px]*/
  .question-box-buttons-container {
    width: 60%;
  }
}
</style>