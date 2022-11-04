<template>
  <b-nav tabs class="header-container">
    <b-nav-item disabled>Questions: {{currentQuestionIndex + 1 }}/{{questionsCount}}</b-nav-item>
  </b-nav>
</template>
<script>
export default {
  props: ['questionsCount', 'currentQuestionIndex','score']

}
</script>

<style scoped>

@media only screen and (max-width: 280px) {
  .header-container {
    height: 5vh;
  }
}
</style>
