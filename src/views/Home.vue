<template>
  <div style="{overflow: hidden}" @click.stop>
    <div class="px-0 container-md">
      <picture>
        <source
          srcset="@/assets/hero-image__small.webp"
          media="(max-width: 450px)"
          type="image/webp"
        />
        <source
          srcset="@/assets/hero-image__small.jpg"
          media="(max-width: 450px)"
          type="image/jpeg"
        />
        <source srcset="@/assets/hero-image.webp" type="image/webp" />
        <source srcset="@/assets/hero-image.jpg" type="image/jpeg" />
        <img
          src="@/assets/hero-image.jpg"
          class="hero-image mb-3"
          alt="Delicious piece of cake and flower on wooden table"
        />
      </picture>
    </div>

    <main class="container">
      <div class="d-flex justify-content-end mt-3">
        <div class="dropdown">
          <div
            class="dropdown-title"
            @click="dropdownShow = !dropdownShow"
            @mouseover="dropdownShow = true"
            @mouseleave="dropdownShow = false"
          >
            {{ selectedCategory }}
          </div>

          <ul
            class="dropdown-content"
            :class="{ show: dropdownShow }"
            @mouseover="dropdownShow = true"
            @mouseleave="dropdownShow = false"
          >
            <li @click="setAllProducts">所有商品</li>
            <li @click="getCategory('切片蛋糕')">切片蛋糕</li>
            <li @click="getCategory('生日蛋糕')">生日蛋糕</li>
            <li @click="getCategory('精緻甜點')">精緻甜點</li>
          </ul>
        </div>
      </div>

      <div class="row">
        <app-product
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="col-6 col-md-4 col-lg-3"
        ></app-product>
      </div>

      <app-cart-modal></app-cart-modal>
    </main>
  </div>
</template>

<script>
import AppProduct from '@/components/AppProduct.vue';
import AppCartModal from '@/components/AppCartModal.vue';
import { db } from '../firebase';

export default {
  name: 'Home',
  data() {
    return {
      products: [],
      allProducts: [],
      selectedCategory: '商品分類',
      dropdownShow: false,
    };
  },
  methods: {
    getCategory(category) {
      this.selectedCategory = `商品分類：${category}`;
      this.dropdownShow = false;

      this.products = [
        ...this.allProducts.filter((product) => product.category === category),
      ];
    },
    getAllProducts() {
      const docRef = db
        .collection('products')
        .where('isEnabled', '==', true)
        .orderBy('category');

      docRef.onSnapshot((snapshot) => {
        this.allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        this.setAllProducts();
      });
    },
    setAllProducts() {
      this.products = [...this.allProducts];
      this.selectedCategory = '商品分類：所有商品';
      this.dropdownShow = false;
    },
  },
  mounted() {
    this.getAllProducts();
  },
  activated() {
    this.$store.commit('changeDefaultRoute', true);
  },
  components: {
    AppProduct,
    AppCartModal,
  },
};
</script>

<style lang="scss" scoped>
.hero-image {
  max-width: 100%;
  height: auto;
}

.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 10px;
  width: 160px;
}

.dropdown-title {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 5px;
  border-bottom: 1px solid black;

  &::after {
    content: '\f107';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    position: absolute;
    top: 0;
    right: 0;
  }
}

.dropdown-content.show {
  display: block;
}

.dropdown-content.show ~ .dropdown-title {
  border-bottom: none;
}

.dropdown-content {
  display: none;
  position: absolute;

  background-color: white;
  min-width: 160px;
  border: 1px solid $white-dark;
  z-index: 1;
  padding-inline-start: 0;
  text-align: left;
  margin-top: -1px;
}

.dropdown-content li {
  color: black;
  padding: 5px 10px;
  text-decoration: none;
  display: block;
  width: 100%;

  &:hover {
    color: white;
    background-color: $tomato-red;
  }
}
</style>
