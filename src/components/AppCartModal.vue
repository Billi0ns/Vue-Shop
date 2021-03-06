<template>
  <transition name="fade">
    <div class="cart-modal" v-if="showModal">
      <div class="cart-modal__content">
        <div class="row">
          <div class="col">
            <div class="image-container">
              <b-img :src="product.imageFile" class="product-image"></b-img>
              <span class="image-tag" @click="handleUrl"></span>
            </div>
          </div>

          <div class="col-xs-12 col-md-6 text-left mt-2 mt-md-0">
            <h5 class="mt-1 product-title">{{ product.title }}</h5>
            <p class="font-weight-bold product-price">
              {{ product.price | formatNumber }}
            </p>

            <p class="cart-info">
              ① 甜點皆為接單安排製作，故訂單確認後無法更換口味 ②
              到貨日前五天(不含例假日)，不接受更改到貨時間與地址
            </p>

            <label for="demo-sb" class="amount-text mb-0">
              數量
            </label>

            <div class="justify-content-center mobile-bottom">
              <b-form-spinbutton
                id="demo-sb"
                v-model="amount"
                min="1"
                max="30"
                class="mb-3"
              ></b-form-spinbutton>

              <p class="product-subtotal">
                小計：{{ (product.price * amount) | formatNumber }}
              </p>
            </div>

            <div class="desktop-bottom">
              <b-form-spinbutton
                id="demo-sb"
                v-model="amount"
                min="1"
                max="30"
                class="mb-3"
              ></b-form-spinbutton>

              <p class="text-right font-weight-bold mb-3">
                小計：{{ (product.price * amount) | formatNumber }}
              </p>
            </div>

            <button class="cart-btn" @click="addToCartHandler">
              加入購物車
            </button>
          </div>
        </div>
      </div>

      <div class="cart-modal__backdrop" @click="hideCartModal"></div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      amount: 1,
    };
  },
  computed: {
    product() {
      return this.$store.state.currentProduct;
    },
    showModal() {
      return this.$store.state.showCartModal;
    },
  },
  methods: {
    hideCartModal() {
      this.$store.commit('toggleCartModal', false);
      this.amount = 1;
    },
    addToCartHandler() {
      this.$store.commit('addToCart', {
        amount: this.amount,
        id: this.product.id,
        title: this.product.title,
        price: this.product.price,
        imageFile: this.product.imageFile,
        description: this.product.description,
      });

      this.hideCartModal();
      this.$store.commit('toggleCartListSlider', true);
    },
    handleUrl() {
      this.hideCartModal();
      this.$router.push({ path: `/products/${this.product.id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/Transition.scss';

.cart-modal {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-modal__backdrop {
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.cart-modal__content {
  position: relative;
  z-index: 2;
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 7px;
  width: 55%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.cart-info,
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
  background-color: $tomato-red;
  border: 1px solid $tomato-red;
  font-size: 15px;

  &:hover {
    color: $tomato-red;
    background-color: white;
  }
}

.image-container {
  position: relative;

  // To avoid content jumping when loading images
  height: 0;
  padding-top: 100%;
  background: $white-light;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  height: auto;
}

.image-tag::after {
  content: '商品資訊';
  font-size: 12px;
  padding: 3px 7px;
  color: white;
  background: rgba(3, 3, 3, 0.6);
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
}

.product-subtotal {
  line-height: 38px;
  text-align: right;
  font-weight: bold;
  width: 100%;
  margin-bottom: 8px;
}

.mobile-bottom {
  display: none;
}

@media (max-width: 992px) {
  .cart-modal__content {
    width: 65%;
  }
}

@media (max-width: 768px) {
  .cart-modal__content {
    width: 80%;
    padding: 15px;
  }

  .product-title,
  .product-price {
    margin-bottom: 5px !important;
  }

  .cart-info {
    margin-bottom: 5px;
  }

  .mobile-bottom {
    display: flex;
  }

  .desktop-bottom {
    display: none;
  }
}

@media (max-width: 576px) {
  .image-tag::after {
    width: 100%;
    font-size: 15px;
  }
}
</style>
