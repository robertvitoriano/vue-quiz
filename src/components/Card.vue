<template>
  <div class="item-wrapper">
    <div class="item-content">
      <router-link :to="item.link" class="item-title">
        {{itemTitleFormatted}}
      </router-link>
      <router-link :to="item.link">
        <div class="item-container" ref="itemContainer" :style="cardStyle"></div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['item'],
  data() {
    return {
      cardStyle: {
        'background-image':'url(' + '"' +  this.item.image + '"' + ')',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
      },
      itemTitleFormatted:this.item.title.length >= 17 ?this.item.title.substring(0,14)+'...': this.item.title
    }
  }
}
</script>
<style scoped>


@media (min-width: 280px) {
  .item-wrapper {
    margin-bottom: 1rem;
  }

  .item-container {
    height: 40vh;
    width: 90vw;
  }

  .item-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item-title {
    color:white;
    font-size:3rem;
    text-decoration: none;
  }
  .item-title:hover{
    text-decoration: underline;
  }
}
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .item-wrapper {
    height: 100px;
  }

  .item-container {
    width: 250px;
    height: 250px;
  }

  .item-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .item-title {
    color:white;
    font-size:2rem;
    text-decoration: none;
  }
  .item-title:hover{
    text-decoration: underline;
  }
}
</style>
