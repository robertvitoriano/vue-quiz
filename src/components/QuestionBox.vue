<template>
  <div class="question-box-container">
    <b-jumbotron class="question-box-content">
      <div class="question-container">
        <div class="question-section">
          <p>{{question.question}}</p>
        </div>
        <div class="answers-section">
          <ul class="answers-list">
            <li :key="alternative" v-for="alternative in alternatives">{{alternative}}</li>
          </ul>
        </div>
      </div>
      <div class="question-box-buttons-container">
        <b-button variant="primary" href="#">Submit
        </b-button>
        <b-button variant="success" href="#">Next Question</b-button>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
  export default {
    props:['question'],
    mounted(){
    },
    methods:{

    },
    data(){
      return{
        alternatives:[...this.question.incorrect_answers,this.question.correct_answer]
      }
    }
  }
</script>

<style scoped>
.question-box-content {
  height: 60vh;
  display: flex;
  flex-direction: column;
  background-color: lightgray;
  align-items: center;
  justify-content: center
}

.question-container {
  background-color: white;
  margin-bottom: 20px;
  width: 80%;
  height: 80%;
  border: 4px black solid;
  border-radius: 15px;
}

.answers-section {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  height: 50%;
  border-top: 1px solid black;
  overflow: auto;
}

.answers-section::-webkit-scrollbar {
  width: 10px;
}

.answers-section::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;

}

.answers-section::-webkit-scrollbar-thumb {
  background:black;
  border-radius: 10px;
}

.answers-section::-webkit-scrollbar-thumb:hover {
  opacity: 30%;  
}

.question-section {
  height: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.question-box-buttons-container{
  width: 20%;
  display: flex;
  justify-content: space-between;
}
@media only screen and (max-width: 600px){
	/*Big smartphones [426px -> 600px]*/
  .question-box-buttons-container{
    width: 60%;
  }
}

</style>