<template>
  <div>
    <div class="grid-list" v-if="items.length">
      <Card v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'
export default {
  name: 'GridList',
  components: {
    Card
  },
  props: ['items']
}
</script>
<style scoped>


@media (min-width: 280px) {
  .grid-list {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .grid-list {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: auto;
    column-gap: 2rem;
    row-gap: 13rem;
    height: 500px;
  }
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {}

</style>
