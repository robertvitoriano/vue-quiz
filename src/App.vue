<template>
  <div id="app">
    <Header :questionsCount="questions.length"></Header>
    <QuestionBox :question="currentQuestion"></QuestionBox>
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
      question: {}
    }
  },
  methods: {
    async loadQuestions() {
      const questionsResponse = await axios.get('https://opentdb.com/api.php?amount=10&category=15&type=multiple')
      this.questions = questionsResponse.data.results
      this.currentQuestion = questionsResponse.data.results[0]
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
