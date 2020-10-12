<template>
  <div class="product-card container pb-4">
    <!--  <img :src="product.imageFile" alt="" class="product-card__img pb-3" /> -->
    <div
      :style="{ backgroundImage: getImageUrl(product.imageFile) }"
      class="imageContainer"
    >
      <button class="desktop-btn" @click="launchModal">
        加入購物車
      </button>
    </div>

    <div>{{ product.title }}</div>
    <div class="pb-3 font-weight-bold">NT${{ product.price }}</div>
    <b-button class="w-100 mobile-btn" size="sm" variant="light">
      加入購物車
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  methods: {
    getImageUrl(image) {
      return `url(${image})`;
    },
    launchModal() {
      this.$bvModal.show('cart-modal');
      this.$store.commit('setCurrentProduct', this.product);
    },
  },
};
</script>

<style lang="scss" scoped>
/* .product-card__img {
  width: 100%;
  height: auto;
} */

.imageContainer {
  width: 100%;
  padding: 50%;
  margin-bottom: 10px;
  min-height: 200px;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
  background-size: contain;
  position: relative;
}

.desktop-btn {
  position: absolute;
  width: 90%;
  height: 40px;
  bottom: 0;
  left: 5%;
  right: 5%;
  margin-bottom: 10px;
  border: none;
  border-radius: 3px;
  background: white;
  z-index: 1;
  display: none;

  &:hover {
    color: white;
    background-color: rgb(253, 100, 78);
  }
}

@media (min-width: 992px) {
  .mobile-btn {
    display: none;
  }

  .product-card:hover .desktop-btn {
    display: block;
  }
  .product-card:hover .imageContainer::after {
    content: '';
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
