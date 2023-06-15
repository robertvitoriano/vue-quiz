<template>
  <b-modal :id="modalId">
    <template #modal-header>
      <div class="modal-header-container">
        <h2>{{title}}</h2>
        <slot name="modal-header"></slot>
      </div>
    </template>
    <slot name="content"></slot>
    <template #modal-footer>
      <div class="modal-footer-container">
        <slot name="modal-footer"></slot>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "Modal",
  props: ["modalId", "title"],
};
</script>

<style></style>
