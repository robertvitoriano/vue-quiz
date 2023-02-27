<template>
  <div class="question-box-container">
    <Header
      :questions-count="questionsCount"
      :current-question-index="currentQuestionIndex"
    />
    <div class="question-box-content">
      <h2>{{ courseTitle }}</h2>
      <div class="question-container">
        <div class="question-section">
          <p>{{ currentQuestion.text}}</p>
        </div>
        <div class="alternatives-section">
          <b-list-group class="alternatives-list">
            <b-list-group-item
              :class="alternativeClass(index)"
              :key="index"
              v-for="(alternative, index) in currentQuestion.alternatives"
              @click="selectAnswerIndex(index)"
            >
              {{ alternative.text }}</b-list-group-item
            >
          </b-list-group>
        </div>
      </div>
      <div class="question-box-buttons-container">
        <b-button
          variant="primary"
          href="#"
          :disabled="disableSubmitButton"
          @click.prevent="handleSubmit"
          >{{ submitButtonText }}
        </b-button>
        <b-button variant="success" href="#" @click="emitNextQuestionEvent">{{
          nextButtonText
        }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import courseService from "../services/courseService";
import Header from "./Header.vue";
import { mapActions } from "vuex";
export default {
  props: {
    currentQuestion: Object,
    currentQuestionIndex: Number,
    questionsCount: Number,
    courseTitle: String,
  },
  components: {
    Header,
  },
  data() {
    return {
      selectedAnswerIndex: null,
      hasAnswered: false,
      submitButtonText: "Save Answer",
      nextButtonText: "Next Question",
      disableSubmitButton: false,
    };
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.shuffleAlternatives();
        this.rightAnswerIndex = this.currentQuestion.alternatives.findIndex(
          (alternative) => alternative.isRight === 1
        );
        this.hasAnswered = this.currentQuestion.alternatives.some(alternative => !!alternative.hasAnswered)
      },
    },
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    emitNextQuestionEvent() {
      if (!this.hasAnswered) return alert("You have to answer !");

      if (this.currentQuestionIndex + 2 === this.questionsCount) {
        this.nextButtonText = "Finish Quiz";
      }
      if (this.currentQuestionIndex + 1 === this.questionsCount) {
        this.$emit("hasFinishedEvent");
      }
      this.$emit("nextQuestionEvent");
      this.resetAnswerState();
    },
    async handleSubmit() {
      this.changeLoadingState();
      const selectedAnswer = this.currentQuestion.alternatives.find((question, index) => index === this.selectedAnswerIndex );
      await courseService.saveUserAnswer(selectedAnswer.id);
      this.changeLoadingState();
      if (this.selectedAnswerIndex === this.rightAnswerIndex) {
        alert("You got it right");
        this.$emit("increaseScoreEvent");
      } else {
        alert("You got it wrong");
      }
      this.submitButtonText = "Answered";
      this.disableSubmitButton = true;
      this.hasAnswered = true;
    },
    selectAnswerIndex(index) {
      if (!this.hasAnswered) {
        this.selectedAnswerIndex = index;
      }
    },
    resetAnswerState() {
      this.submitButtonText = "Save Answer";
      this.disableSubmitButton = false;
      this.hasAnswered = false;
      this.selectedAnswerIndex = null;
    },
    alternativeClass(index) {
      return {
        alternative: true,
        selected: this.getAlternativeBackground("selected-alternative", index),
        "list-group-item-hover": this.getAlternativeBackground(
          "hover-alternative",
          index
        ),
        "correct-alternative": this.getAlternativeBackground(
          "correct-alternative",
          index
        ),
        "wrong-alternative": this.getAlternativeBackground(
          "wrong-alternative",
          index
        ),
      };
    },
    getAlternativeBackground(validationType, index) {
      const hasSelected = this.selectedAnswerIndex === index;
      const isRight = index === this.rightAnswerIndex;
      const hasSelectedAndIsWrong = hasSelected && !isRight && this.hasAnswered;
      const validationTypes = {
        "selected-alternative": hasSelected,
        "hover-alternative": !hasSelected,
        "wrong-alternative": hasSelectedAndIsWrong,
        "correct-alternative": isRight && this.hasAnswered,
      };
      return validationTypes[validationType];
    },
    shuffleAlternatives() {
      this.currentQuestion.alternatives =
        this.currentQuestion.alternatives.sort(() => Math.random() - 0.5);
    },
  },
};
</script>

<style scoped>
.question-box-content {
  height: 60vh;
  display: flex;
  flex-direction: column;
  background-color: lightgray;
  align-items: center;
  justify-content: center;
  color: black;
}

.question-container {
  background-color: white;
  margin-bottom: 20px;
  width: 80%;
  height: 80%;
  border: 4px black solid;
  border-radius: 15px;
}

.alternatives-section {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  height: 50%;
  border-top: 1px solid black;
  overflow: auto;
}

.alternatives-section::-webkit-scrollbar {
  width: 10px;
}

.alternatives-section::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.alternatives-section::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 10px;
}

.alternatives-section::-webkit-scrollbar-thumb:hover {
  opacity: 30%;
}

.question-section {
  height: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: black;
}

.question-box-buttons-container {
  width: 20%;
  display: flex;
  justify-content: space-between;
}

.selected {
  background-color: lightseagreen;
}

.alternative {
  cursor: pointer;
}

.list-group-item-hover:hover {
  background-color: gray;
}

.correct-alternative {
  background-color: green;
}

.wrong-alternative {
  background-color: red;
}

@media only screen and (min-width: 280px) {
  .question-box-buttons-container {
    width: 60%;
  }
  .question-box-content {
    height: 80vh;
  }
  .question-container {
    width: 90%;
  }
}
@media only screen and (min-width: 992px) {
  .question-box-buttons-container {
    width: 60%;
  }
  .question-box-content {
    height: 80vh;
  }
  .question-container {
    width: 90%;
    height: 50vh;
  }
}
</style>
