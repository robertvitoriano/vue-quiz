<template>
  <b-nav tabs>
    <b-nav-item disabled ><b>Quiz App</b></b-nav-item>
    <b-nav-item disabled >Counter: {{currentQuestionIndex + 1 }}/{{questionsCount}}</b-nav-item>
  </b-nav>
</template>
<script>
  export default{
    props:['questionsCount', 'currentQuestionIndex']

  }
</script>