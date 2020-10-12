<template>
  <div class="product-card container pb-4">
    <img :src="product.imageFile" alt="" class="product-card__img pb-3" />

    <div>{{ product.title }}</div>
    <div class="pb-3 font-weight-bold">NT${{ product.price }}</div>
    <b-button class="w-100" size="sm" variant="light">
      加入購物車
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style lang="scss" scoped>
.product-card__img {
  width: 100%;
  height: auto;
}
</style>
