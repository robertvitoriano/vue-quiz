<template>
  <div id="app">
    <!-- <Header v-if="token"/> -->
    <router-view />
  </div>
</template>

<script>
// import Header from "./components/Header.vue";
export default {
    // components: { Header },
    data(){
      return {
        token: localStorage.getItem('token')
      }
    }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
