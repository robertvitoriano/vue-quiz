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
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px white;
}
</style>
