<template>
<AuthLayout>
  <template #content>
  <div class="quiz-wrapper">
    <QuestionBox
     :current-question="currentQuestion"
     :current-question-index="currentQuestionIndex"
     :questions-count="questions.length"
     :course-title="courseTitle"
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
import courseService from './../services/courseService'
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Quiz',
  components: {
    QuestionBox,
    RestartSection,
    AuthLayout
},
  mounted: function () {
    this.load()
  },
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      currentQuestion: {},
      score:0,
      hasFinished:false,
      courseTitle:'',
      players:[]
    }
  },
  methods: {
    ...mapActions(['changeLoadingState']),
    async load(){
      const playersResponse = await courseService.getCourseBattleUsers(this.$route.params.courseBattleId)
      this.players = playersResponse.data.data.courseBattleUsers
      const isRegisteredInBattle = this.players.some((player)=> player.userId === this.userInfo.id)

      if(!isRegisteredInBattle) return this.$router.push('/home')
      await this.loadQuestions()
    },
    async loadQuestions() {
      this.changeLoadingState();
      const response = await courseService.getCourseQuestions(this.$route.params.courseBattleId)
      this.questions = response.data.questions
      this.currentQuestionIndex = 0
      this.currentQuestion = this.questions[this.currentQuestionIndex]
      this.courseTitle = response.data.course.title
      this.changeLoadingState();
    },
    updatedCurrentQuestionIndex() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex]

      }
    },
    finishQuiz(){
      this.hasFinished = true
    },
    restart(){
      this.loadQuestions()
      this.hasFinished = false
    }
  },
  computed:{
    ...mapGetters(["userInfo"]),
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
