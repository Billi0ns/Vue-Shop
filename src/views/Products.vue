<template>
  <div>
    <app-header></app-header>

    <app-products></app-products>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppProducts from '@/components/AppProducts.vue';

export default {
  name: 'Products',
  components: {
    AppHeader,
    AppProducts,
  },
};
</script>

<style lang="scss" scoped></style>
