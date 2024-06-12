<template>
  <AuthLayout>
    <template #content>
      <div class="quiz-wrapper">
        <QuestionBox :current-question="currentQuestion" :current-question-index="currentQuestionIndex"
          :questions-count="questions.length" :course-title="courseTitle"
          @nextQuestionEvent="updatedCurrentQuestionIndex" @increaseScoreEvent="score++" @hasFinishedEvent="finishQuiz"
          @addUserChosenAlternative="addUserChosenAlternative" v-if="(questions.length > 0) && !hasFinished">
        </QuestionBox>
        <RestartSection 
        v-if="hasFinished" 
        :score="score" 
        :result="result" 
        :course-title="courseTitle" 
        @restartEvent="restart"
        :players="players"
        ></RestartSection>
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
      score: 0,
      hasFinished: false,
      courseTitle: '',
      courseId: null,
      players: [],
      userChosenAlternatives: [],
      result:'not-finished'
    }
  },
  methods: {
    ...mapActions(['changeLoadingState']),
    async load() {
      const playersResponse = await courseService.getCourseBattleUsers(this.$route.params.courseBattleId)
      this.players = playersResponse.data.data.courseBattleUsers
      const isRegisteredInBattle = this.players.some((player) => player.userId === this.userInfo.id)
      const courseBattleResult =(await courseService.getCourseBattleResult(this.$route.params.courseBattleId)).data
      this.hasFinished = courseBattleResult.data.result !== 'not-finished'
      this.result = courseBattleResult.data.result
      if(this.hasFinished) this.score = courseBattleResult.data.userPerformance
      if (!isRegisteredInBattle) return this.$router.push('/home')
      
      await this.loadQuestions({showLoading:false})
    },
    async loadQuestions({showLoading}) {
      if(showLoading) this.changeLoadingState();
      const response = await courseService.getCourseQuestions(this.$route.params.courseBattleId)
      this.questions = response.data.questions
      this.currentQuestionIndex = 0
      this.currentQuestion = this.questions[this.currentQuestionIndex]
      this.courseTitle = response.data.course.title
      this.courseId = response.data.course.id
      if(showLoading) this.changeLoadingState();
    },
    updatedCurrentQuestionIndex() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex]

      }
    },
    async finishQuiz(timeInSeconds) {
      this.changeLoadingState();
      const finishResult = await courseService.finishCourseBattle({
        courseBattleId: this.$route.params.courseBattleId,
        courseId: this.courseId,
        userChosenAlternatives: this.userChosenAlternatives,
        timeSpent:timeInSeconds,
        })
        this.changeLoadingState();
        this.hasFinished = true
        this.hasFinished = finishResult.data.data.result !== 'not-finished'
        this.result = finishResult.data.data.result
      if(this.hasFinished) this.score = finishResult.data.data.userPerformance
    },
    addUserChosenAlternative(userChosenAlternative) {
      if (this.userChosenAlternatives.includes(alternative => alternative.id === userChosenAlternative.id)) return
      this.userChosenAlternatives.push(userChosenAlternative)

    },
    restart() {
      this.loadQuestions()
      this.hasFinished = false
    }
  },
  computed: {
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
  width: 100%;
}
</style>
