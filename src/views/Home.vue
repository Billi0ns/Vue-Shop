<template>
  <div style="{overflow: hidden}">
    <div class="px-0 container-md">
      <picture>
        <source
          srcset="../assets/hero-image__small.webp"
          media="(max-width: 450px)"
          type="image/webp"
        />
        <source
          srcset="../assets/hero-image__small.jpg"
          media="(max-width: 450px)"
          type="image/jpeg"
        />
        <source srcset="../assets/hero-image.webp" type="image/webp" />
        <source srcset="../assets/hero-image.jpg" type="image/jpeg" />
        <img src="../assets/hero-image.jpg" class="hero-image mb-3" alt="" />
      </picture>
    </div>

    <div class="container">
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
            <li @click="getCategory('重乳酪')">重乳酪蛋糕</li>
            <li @click="getCategory('輕乳酪')">輕乳酪蛋糕</li>
            <li @click="getCategory('禮盒')">禮盒</li>
          </ul>
        </div>
      </div>

      <div class="row">
        <app-product
          v-for="product in products"
          :key="product.key"
          :product="product"
          class="col-6 col-md-4 col-lg-3"
        ></app-product>
      </div>

      <app-cart-modal></app-cart-modal>
    </div>
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
        console.log("All data in 'products' collection", this.allProducts);
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
    right: 0;
    top: 0;
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
  border: 1px solid #ededed;
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
    background-color: rgb(253, 100, 78);
  }
}

.hero-image {
  max-width: 100%;
  height: auto;
}
</style>
