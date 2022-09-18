<template>
  <div class="restart-section-container">
    <h3>Do you want to try again ?</h3>
    <h1>{{getPerformanceText()}}</h1>
    <div class='restart-buttons-container'>
      <b-button variant="danger" href="#">
        no
      </b-button>
      <b-button variant="success" href="#" @click="emitRestart">yes</b-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    score: Number
  },
  mounted(){
    
  },
  methods:{
    emitRestart(){
      this.$emit('restartEvent')
    },
    getPerformanceText(){
      if(this.score === 0) return 'Unfortunately you have not scored, try again, I know you can improve'
      return `Congratulations, you obtained ${this.score} points !`  
      
    }
  }
}

</script>
<style scoped>

  .restart-buttons-container{
    width:10%;
    display: flex;
    justify-content: space-between;

  }
.restart-section-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height:100vh;
}
</style>