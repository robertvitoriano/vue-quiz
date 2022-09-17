<template>
  <div id="app">
    <Header :questionsCount="questions.length" :currentQuestionIndex="currentQuestionIndex"></Header>
    <QuestionBox :question="currentQuestion" @nextQuestionEvent="updatedCurrentQuestionIndex"></QuestionBox>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import QuestionBox from './components/QuestionBox.vue';
import axios from 'axios'
export default {
  name: 'App',
  components: {
    Header,
    QuestionBox
  },
  mounted: function () {
    this.loadQuestions()
  },
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      currentQuestion: {}
    }
  },
  methods: {
    async loadQuestions() {
      const questionsResponse = await axios.get('https://opentdb.com/api.php?amount=10&category=15&type=multiple')
      this.questions = questionsResponse.data.results
      this.currentQuestionIndex = 0
      this.currentQuestion = questionsResponse.data.results[this.currentQuestionIndex]
    },
    updatedCurrentQuestionIndex() {
      if (this.currentQuestionIndex < this.questions.length) {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex]
      }
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
