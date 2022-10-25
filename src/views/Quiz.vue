<template>
<AuthLayout>
  <template #content>
  <div class="quiz-wrapper">
    <QuestionBox
     :currentQuestion="currentQuestion"
     :currentQuestionIndex="currentQuestionIndex"
     :questionsCount="questions.length"
     @nextQuestionEvent="updatedCurrentQuestionIndex"
     @increaseScoreEvent= "score++"
     @hasFinishedEvent = "finishQuiz"
      v-if="(questions.length > 0) && !hasFinished"></QuestionBox>
    <RestartSection v-if="hasFinished" :score="score" @restartEvent="restart"></RestartSection>
  </div>
</template>
</AuthLayout>

</template>

<script>
import QuestionBox from './../components/QuestionBox.vue';
import RestartSection from './../components/RestartSection.vue';
import AuthLayout from './../Layout/AuthLayout.vue'
import axios from 'axios'
export default {
  name: 'Quiz',
  components: {
    QuestionBox,
    RestartSection,
    AuthLayout
},
  mounted: function () {
    this.loadQuestions()
  },
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      currentQuestion: {},
      score:0,
      hasFinished:false
    }
  },
  methods: {
    async loadQuestions() {
      const questionsResponse = await axios.get('https://opentdb.com/api.php?amount=10&category=15&type=multiple')
      this.questions = this.getAlternativesWithCorrectAnswer(questionsResponse.data.results)
      this.currentQuestionIndex = 0
      this.currentQuestion = this.questions[this.currentQuestionIndex]
    },
    updatedCurrentQuestionIndex() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex]
      }
    },
    getAlternativesWithCorrectAnswer(questions) {
      return questions.map(question => ({ ...question, alternatives: [...question.incorrect_answers, question.correct_answer] }))
    },
    finishQuiz(){
      this.hasFinished = true
    },
    restart(){
      this.loadQuestions()
      this.hasFinished = false
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.quiz-wrapper {
  width:100%;
}

</style>
