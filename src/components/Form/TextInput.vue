<template>
  <div>
    <label :for="id" v-if="label">{{ label }}</label>
    <input
      :id="id"
      :name="id"
      type="text"
      :value="value"
      @input="handleInput"
      class="input"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    id: String,
    value: String,
    label: String,
    placeholder: String,
  },
  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style scoped>
.input {
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: transparent;
  border-color: white;
  outline: none;
  color: white;
  width: 100%;
  text-align: center;
  height: 4rem;
  display: block;
}
</style>
