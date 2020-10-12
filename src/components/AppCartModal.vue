<template>
  <div>
    <b-button @click="$bvModal.show('cart-modal')"
      >Launch centered modal</b-button
    >

    <b-modal id="cart-modal" centered title="BootstrapVue">
      <p class="my-4">Vertically centered modal!</p>
      <p>{{ product.title }}</p>
      <p>{{ product.price }}</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    product() {
      return this.$store.state.currentProduct;
    },
  },
  /* created() {
    this.product = { ...this.$store.state.currentProduct };
  }, */
};
</script>

<style lang="scss" scoped></style>
