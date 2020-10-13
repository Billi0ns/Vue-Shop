<template>
  <!--   <div>
    <b-button @click="$bvModal.show('cart-modal')"
      >Launch centered modal</b-button
    >

    <b-modal id="cart-modal" centered title="BootstrapVue">
      <p class="my-4">Vertically centered modal!</p>
      <p>{{ product.title }}</p>
      <p>{{ product.price }}</p>
      <div class="modal-footer d-none"></div>
    </b-modal>
  </div> -->

  <transition name="fade">
    <div class="cart-modal" v-if="showModal">
      <div class="cart-modal__content">
        <div class="row">
          <div class="col">
            <b-img :src="product.imageFile" fluid></b-img>
          </div>

          <div class="col text-left">
            <h5 class="mt-1 mb-3">{{ product.title }}</h5>
            <p class="font-weight-bold">NT${{ product.price }}</p>
            <p class="cart-description">
              ① 蛋糕皆為接單安排製作，故訂單確認後無法更換口味
              ②到貨日前五天(不含例假日)，不接受更改到貨時間與地址
            </p>
            <label for="demo-sb" class="amount-text mb-0">
              數量
            </label>
            <b-form-spinbutton
              id="demo-sb"
              v-model="amount"
              min="1"
              max="10"
              class="mb-5"
            ></b-form-spinbutton>

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
      console.log(`購買${this.product.title} ${this.amount} 份`);
      this.hideCartModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-modal {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 7px;
  width: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.cart-description,
.amount-text {
  font-size: 13px;
  font-weight: bold;
  color: #aaa;
}

.cart-btn {
  width: 100%;
  padding: 5px 0;
  margin-bottom: 10px;
  border: none;
  border-radius: 3px;
  color: white;
  background-color: rgb(253, 100, 78);
  border: 1px solid rgb(253, 100, 78);
  font-size: 15px;

  &:hover {
    color: rgb(253, 100, 78);
    background-color: white;
  }
}

// Transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
