<template>
  <div class="container" style="{overflow: hidden}">
    <div class="d-flex justify-content-end mr-3">
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
          <li @click="getAllProducts">所有商品</li>
          <li @click="getCategory('蛋糕')">蛋糕</li>
          <li @click="getCategory('aaa')">aaa</li>
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
</template>

<script>
import AppProduct from './AppProduct.vue';
import AppCartModal from './AppCartModal.vue';
import { db } from '../firebase';

export default {
  data() {
    return {
      products: [],
      selectedCategory: '商品分類',
      dropdownShow: false,
    };
  },
  methods: {
    getCategory(category) {
      this.selectedCategory = `商品分類：${category}`;
      this.dropdownShow = false;

      const docRef = db
        .collection('products')
        .where('isEnabled', '==', 'true')
        .where('category', '==', category);

      docRef
        .get()
        .then((snapshot) => {
          this.products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log(this.products);
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    },
    getAllProducts() {
      const docRef = db.collection('products').where('isEnabled', '==', true);
      this.selectedCategory = '商品分類：所有商品';
      this.dropdownShow = false;

      docRef.onSnapshot((snapshot) => {
        this.products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("All data in 'products' collection", this.products);
      });
    },
  },
  created() {
    this.getAllProducts();
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
</style>
