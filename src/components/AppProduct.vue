<template>
  <div class="mb-4">
    <div class="product-card">
      <div
        :style="{ backgroundImage: getImageUrl(product.imageFile) }"
        class="imageContainer cursorPointer"
        @click="handleUrl"
      >
        <button class="desktop-btn" @click.stop="launchModal">
          加入購物車
        </button>
      </div>

      <span class="cursorPointer" @click="handleUrl">{{ product.title }}</span>
      <div class="pb-3 font-weight-bold ">
        <span class="cursorPointer" @click="handleUrl">
          {{ product.price | formatNumber }}
        </span>
      </div>

      <b-button
        class="w-100 mobile-btn"
        size="sm"
        variant="light"
        @click.stop="launchModal"
      >
        加入購物車
      </b-button>
    </div>
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
      this.$store.commit('toggleCartModal', true);
      this.$store.commit('setCurrentProduct', this.product);
    },
    handleUrl() {
      this.$router.push({ path: `products/${this.product.id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.product-card {
  border: 1px solid #eee;
}

.imageContainer {
  width: 100%;
  padding: 50%;
  margin-bottom: 10px;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
  background-size: contain;
  position: relative;
}

.cursorPointer {
  cursor: pointer;
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
