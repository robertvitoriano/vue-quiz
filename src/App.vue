<template>
  <div id="app">
    <!-- <Header v-if="token"/> -->
    <router-view />
    <div  class="loading-container" v-if="isLoading" >
      <b-spinner
        variant="dark"
        style="width: 200px; height: 200px; position: absolute"
      ></b-spinner>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed:{
    ...mapGetters(['isLoading'])
  }
};
</script>

<style>
* {
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
#app{
  position: relative;
}
.loading-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
}
a{
  text-decoration: none;
  color: inherit;
}

* {
  --vs-controls-color: white;
  --vs-border-color: white;
  --vs-dropdown-bg: black;
  --vs-dropdown-color: white;
  --vs-dropdown-option-color: white;
  --vs-selected-bg: white;
  --vs-selected-color: white;
  --vs-search-input-bg: black;
  --vs-search-input-color: white;
  --vs-dropdown-option--active-bg: white;
  --vs-dropdown-option--active-color: black;
}


.pagination {
  --bs-pagination-padding-x: 0.75rem;
  --bs-pagination-padding-y: 0.375rem;
  --bs-pagination-font-size: 1rem;
  --bs-pagination-color: white;
  --bs-pagination-bg:#323539;
  --bs-pagination-border-width: 1px;
  --bs-pagination-border-color: black;
  --bs-pagination-border-radius: 0.375rem;
  --bs-pagination-hover-color: white;
  --bs-pagination-hover-bg: black;
  --bs-pagination-hover-border-color: #323539;
  --bs-pagination-focus-color: #212529;
  --bs-pagination-focus-bg: #e9ecef;
  --bs-pagination-focus-box-shadow: 0 0 0 0.25rem #323539;
  --bs-pagination-active-color: #fff;
  --bs-pagination-active-bg: #212529;
  --bs-pagination-active-border-color: white;
  --bs-pagination-disabled-color: black;
  --bs-pagination-disabled-bg: gray;
  --bs-pagination-disabled-border-color: black;
}

</style>

<!-- black = #212529 -->
<!-- gray = #323539 -->
