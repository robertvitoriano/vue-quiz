<template>
  <div class="button" @click="handleClick">{{
    title
  }}</div>
</template>

<script>
  export default {
    name:'Button',
    props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit('clicked');
    },
  },
  }
</script>

<style scoped>
.button {
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 1rem;
  margin-top: 1rem;
}

.button:hover {
  background-color: white;
  color: black;
  cursor: pointer;
}

</style>
