<template>
  <div>
    <app-header></app-header>

    <div class="container mt-md-5">
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-xs-12 col-md-6 col-lg-5 image-container">
          <b-img :src="product.imageFile" fluid></b-img>
        </div>
        <div class="col-xs-12 col-md-6  col-lg-5 text-left">
          <h1 class="product-title">{{ product.title }}</h1>
          <p class="product-price">{{ product.price | formatNumber }}</p>
          <p class="product-info">
            ① 蛋糕皆為接單安排製作，故訂單確認後無法更換口味
            ②到貨日前五天(不含例假日)，不接受更改到貨時間與地址
          </p>

          <label for="product-sb" class="amount-text mb-0">
            數量
          </label>
          <div class="d-flex">
            <b-form-spinbutton
              id="product-sb"
              v-model="amount"
              min="1"
              max="30"
              class="mb-4"
            ></b-form-spinbutton>
            <p class="product-subtotal">
              小計：{{ (product.price * amount) | formatNumber }}
            </p>
          </div>

          <button class="cart-btn" @click="addToCartHandler">
            加入購物車
          </button>
          <div class="product-description">
            <div class="product-description__header text-center">
              <span>商品特色</span>
            </div>
            <div class="product-description__content">
              <p v-for="passage in passages" :key="passage" class="mb-2">
                {{ passage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import { db } from '../firebase';

export default {
  data() {
    return {
      amount: 1,
      product: {},
    };
  },
  computed: {
    passages() {
      const productDescription = this.product.description;
      if (productDescription) {
        return productDescription.split('\n');
      }
      return '尚無產品說明';
    },
  },
  components: {
    AppHeader,
  },
  methods: {
    addToCartHandler() {
      console.log(`購買${this.product.title} ${this.amount} 份`);
      this.$store.commit('addToCart', {
        amount: this.amount,
        id: this.product.id,
        title: this.product.title,
        price: this.product.price,
        imageFile: this.product.imageFile,
      });

      // this.$_makeToast('成功加入購物車!');
      this.$store.commit('toggleCartListSlider', true);
    },
  },
  created() {
    const docRef = db.collection('products').doc(this.$route.params.id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          this.product = {
            id: doc.id,
            ...doc.data(),
          };
        } else {
          console.log('No such document!');
          this.$router.replace({ name: 'Home' });
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  },
};
</script>

<style lang="scss" scoped>
.image-container {
  padding: 0;
  margin-bottom: 20px;
}

.product-title {
  font-size: 28px;
  color: #333;
}

.product-price {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.product-info,
.amount-text {
  font-size: 13px;
  font-weight: bold;
  color: #aaa;
}

.cart-btn {
  width: 100%;
  padding: 5px 0;
  border: none;
  border-radius: 3px;
  color: white;
  background-color: rgb(253, 100, 78);
  border: 1px solid rgb(253, 100, 78);
  font-size: 15px;
  margin-bottom: 25px;

  &:hover {
    color: rgb(253, 100, 78);
    background-color: white;
  }
}
.product-subtotal {
  line-height: 38px;
  text-align: right;
  font-weight: bold;
  width: 100%;
  margin-bottom: 8px;
}

.product-description__header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.product-description__header span {
  font-size: 24px;
  letter-spacing: 12px;
  overflow: hidden;
  color: #555;
  position: relative;
  display: inline-block;
  margin-bottom: -8px;
  margin-left: 6px;
}

.product-description__header span::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgb(253, 100, 78);
  margin-left: -12px;
}

@media (min-width: 768px) {
  .image-container {
    padding: 0 15px;
  }
}
</style>
