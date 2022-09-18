<template>
  <div class="restart-section-container">

    <h1>{{performanceText}}</h1>
    <h3>Do you want to try again ?</h3>
    <div class='restart-buttons-container'>
      <b-button class="restart-button" variant="danger" href="#">
        finish course
      </b-button>
      <b-button class="restart-button" variant="success" href="#" @click="emitRestart">try again ?</b-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    score: Number
  },
  data(){
    return{
      performanceText:''
    }
  },
  mounted(){
    this.performanceText = this.getPerformanceText()
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
    width:20%;
    display: flex;
    justify-content: space-between;

  }
.restart-section-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height:100vh;
  background-color: gray;
  height:60vh;
}

</style>