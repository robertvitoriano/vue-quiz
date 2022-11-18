<template>
  <div class="form-container">
    <form class="form">
      <h1 class="form-title">{{ title }}</h1>
      <div class="inputs-container">
        <slot name="inputs"></slot>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Form",
  props: {
    title: String,
  },
};
</script>
<style scoped>
.form {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
}
.form-title {
  text-decoration: underline;
}
.inputs-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container {
  border: aliceblue 3px solid;
  border-radius: 1rem;
  padding-bottom: 1.5rem;
  width: 40%;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
}
@media (max-width: 760px) {
  .form-container {
    width: 80%;
  }
}

</style>
