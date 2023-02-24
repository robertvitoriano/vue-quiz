<template>
  <div>
    <label :for="id" v-if="label">{{ label }}</label>
    <v-select
    class="course-creation-select"
    :options="options"
    @option:selected="handleOptionSelection"
    v-model="value"
  ></v-select>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    options:[
      {label:String, id: String}
    ],
    value:String,
  },
  methods: {
    handleOptionSelection(selectedData){
      this.$emit("optionSelected", selectedData)
    }
  },
};
</script>

<style scoped>
.course-creation-select {
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: white;
  border-color: white;
  outline: none;
  color: black;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
}
</style>
