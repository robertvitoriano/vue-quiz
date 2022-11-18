<template>
  <AuthLayout>
    <template #content>
      <div class="user-creation-wrapper">
      <Form :title="'Create user'">
        <template #inputs>
          <TextInput v-model="name" placeholder="Enter name"></TextInput>
          <TextInput v-model="username" placeholder="Enter username"></TextInput>
          <TextInput v-model="email" placeholder="Enter email"></TextInput>
          <UploadInput :label="'upload avatar'" ></UploadInput>
        </template>
      </Form>
    </div>
    </template>
  </AuthLayout>
</template>

<script>
import Form from "../components/Form/Form.vue";
import TextInput from "../components/Form/TextInput.vue";
import UploadInput from "../components/Form/UploadInput.vue";
import AuthLayout from "../Layout/AuthLayout.vue";
export default {
  name: "Users",
  components: { Form, TextInput, UploadInput, AuthLayout },
  data() {
    return {
      name: "",
      username: "",
      email: "",
    };
  },
};
</script>

<style scoped>
.user-creation-wrapper{
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100%;
}
</style>
