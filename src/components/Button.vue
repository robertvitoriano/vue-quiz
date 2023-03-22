<template>
 <div class="button" @click="emitClickEvent">{{title}}</div>
</template>

<script>
export default {
  name:'Button',
  props:['title'],
  methods: {
    emitClickEvent(){
      this.$emit("handleClick")
    }
  }

}
</script>

<style scoped>
.button{
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 1.5rem;
  border: solid white 1px;
  width: fit-content;
}

.button:hover{
  background-color: white;
  color: black;
}

</style>
