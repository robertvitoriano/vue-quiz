<template>
  <div class="restart-section">
    <h1>{{`Congratulations, you obtained ${score} points !`}}</h1>
    <h3>Do you want to try again ?</h3>
    <div>
      <b-button variant="danger" href="#">
        no
      </b-button>
      <b-button variant="success" href="#" @click="emitRestart">yes</b-button>
    </div>
  </div>
</template>
<script>
export default {
  props() {
    return {
      score: Number
    }
  },
  methods:{
    emitRestart(){
      this.$emit('restartEvent')
    }
  }
}

</script>
<style>
.restart-section-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>