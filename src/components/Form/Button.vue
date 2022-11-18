<template>
  <Button class="button" @click="handleSubmit">{{
    title
  }}</Button>
</template>

<script>
  export default {
    name:'Button',
    props:['handleSubmit', 'title'],
  }
</script>

<style scoped>
.create-course-button {
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 1rem;
  margin-top: 1rem;
}

.create-course-button:hover {
  background-color: white;
  color: black;
}

</style>
