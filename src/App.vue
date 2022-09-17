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
      this.questions = this.getShuffledAlternatives(questionsResponse.data.results)
      this.currentQuestionIndex = 0
      this.currentQuestion = this.questions[this.currentQuestionIndex]
    },
    updatedCurrentQuestionIndex() {
      if (this.currentQuestionIndex < this.questions.length -1) {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex]
      }
    },
    getShuffledAlternatives(questions){
     return questions.map(question =>({...question, alternatives:[...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)}))
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
