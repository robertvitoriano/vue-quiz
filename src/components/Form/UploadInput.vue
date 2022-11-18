
<template>
  <label
  class="file-input-container"
  role="button"
  :for="id"
>
  <input
    class="file-input"
    :id="id"
    :name="id"
    type="file"
    @change="handleInput($event)"
    :ref="ref"
  />
  <b-icon icon="cloud-upload" class="upload-icon"></b-icon>
  <label class="cover-upload-label">{{label}}</label>
</label>
</template>

<script>
export default {
  name: "UploadInput",
  props: {
    id: String,
    value: String,
    label: String,
    ref: Object,
    handleInput: Function
  }
};
</script>

<style scoped>
.file-input-container {
  background-color: transparent;
  border: white 2px solid;
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: relative;
}

.file-input-container:hover {
  background-color: white;
  border: black 2px solid;
  color: black;
  cursor: pointer;
}

.cover-upload-label:hover {
  text-decoration: underline;
  cursor: pointer;
}

.upload-icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;
}

.upload-icon:hover {
  cursor: pointer;
}

.file-input {
  opacity: 0;
  width: 100%;
  position: absolute;
}

</style>
