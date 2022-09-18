<template>
  <div id="app">
    <Header :questionsCount="questions.length" :currentQuestionIndex="currentQuestionIndex"></Header>
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

<script>
import Header from './components/Header.vue';
import QuestionBox from './components/QuestionBox.vue';
import RestartSection from './components/RestartSection.vue';
import axios from 'axios'
export default {
  name: 'App',
  components: {
    Header,
    QuestionBox,
    RestartSection
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

</style>
