
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
    @change="handleFileInput($event)"
    :ref="ref"
  />
  <b-icon icon="cloud-upload" class="upload-icon" v-if="!fileSelected"></b-icon>
  <div class="change-file-button" v-else >{{ changeFileText }}</div>

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
    handleInput: Function,
    changeFileText:String
  },
  data(){
    return{
      fileSelected:false
    }
  },
  methods:{
    handleFileInput(event){
      this.fileSelected = true
      this.handleInput(event)
    }
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

.upload-icon :hover {
  cursor: pointer;
}

.file-input {
  opacity: 0;
  width: 100%;
  position: absolute;
}
.change-file-button {
  background-color: black;
  color: white;
  padding: 1rem 2rem;
  }
  .change-file-button :hover{
    cursor: pointer;
  }

</style>
