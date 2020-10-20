<template>
  <div>
    <app-products></app-products>
  </div>
</template>

<script>
import AppProducts from '@/components/AppProducts.vue';

export default {
  name: 'Products',
  components: {
    AppProducts,
  },
  created() {
    this.$store.commit('changeDefaultRoute', true);
  },
};
</script>

<style lang="scss" scoped></style>
