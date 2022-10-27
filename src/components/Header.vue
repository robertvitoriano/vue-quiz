<template>
  <b-nav tabs>
    <b-nav-item disabled>Counter: {{currentQuestionIndex + 1 }}/{{questionsCount}}</b-nav-item>
    <b-nav-item disabled>Score: {{score}}</b-nav-item>

  </b-nav>
</template>
<script>
export default {
  props: ['questionsCount', 'currentQuestionIndex','score']

}
</script>
