<template>
  <div class="header-container">
    <div class="header-item">
      <p> Questions: {{ currentQuestionIndex + 1 }}/{{ questionsCount }}</p>
    </div>
    <div class="header-item">
      <p>Time: 00:00:00</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['questionsCount', 'currentQuestionIndex', 'score']

}
</script>

<style scoped>

.header-container {
  height: 5vh;
  width: 100%;
  display: flex;
  color: white;
  gap: 4rem;
  align-items: center;
  padding-left: 1rem;
}

p{
  margin-bottom: 0;
}
</style>
