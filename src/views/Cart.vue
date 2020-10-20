<template>
  <div>
    <app-cart-items></app-cart-items>
  </div>
</template>

<script>
import AppCartItems from '@/components/AppCartItems.vue';

export default {
  name: 'Cart',
  components: {
    AppCartItems,
  },
  created() {
    this.$store.commit('changeDefaultRoute', true);
  },
};
</script>

<style lang="scss" scoped></style>
