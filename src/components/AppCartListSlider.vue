<template>
  <div class="cart-list">
    <div
      class="cart-list__content"
      @mouseover="focusStatus = true"
      @mouseleave="focusStatus = false"
      @touchstart="focusStatus = true"
    >
      <div class="cart-list__items">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="d-flex item-container"
        >
          <div>
            <div
              :style="{ backgroundImage: getImageUrl(item.imageFile) }"
              class="item-info__img"
              @click="handleUrl(item)"
            ></div>
          </div>

          <div class="w-100">
            <div class="item-info__title" @click="handleUrl(item)">
              {{ item.title }}
            </div>
            <b-form-spinbutton
              v-model="item.amount"
              min="1"
              max="30"
              size="sm"
              class="my-2"
              style="width: 7rem"
            ></b-form-spinbutton>

            <div class="item-bottom">
              <div class="prize-details">
                單價：{{ item.price | formatNumber }}
              </div>
              <div
                class="item-info__remove"
                @click="deleteItemHandler(item.id)"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div @click="hideCartList">
        <router-link to="/cart" tag="button" class="cart-btn">
          訂單結帳
        </router-link>
      </div>
    </div>
    <div class="cart-list__backdrop" @click="hideCartList"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focusStatus: false,
    };
  },
  computed: {
    showCartList() {
      return this.$store.state.showCartListSlider;
    },
    cartItems() {
      return this.$store.state.cartItems;
    },
  },
  methods: {
    hideCartList() {
      this.$store.commit('toggleCartListSlider', false);
    },
    deleteItemHandler(id) {
      this.$store.commit('deleteCartItem', id);

      if (this.cartItems.length === 0) {
        this.hideCartList();
      }
    },
    updateCart(payload) {
      this.$store.commit('updateCart', payload);
    },
    getImageUrl(image) {
      return `url(${image})`;
    },
    handleUrl(item) {
      this.hideCartList();
      this.$store.commit('setCurrentProduct', item);
      this.$router.push({ path: `/products/${item.id}` });
    },
  },
  created() {
    setTimeout(() => {
      if (!this.focusStatus) {
        this.$store.commit('toggleCartListSlider', false);
      }
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
.cart-list {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.cart-list__backdrop {
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.cart-list__content {
  position: relative;
  z-index: 2;
  background-color: #fefefe;
  width: 300px;
  max-width: 80%;
  height: 100%;
  padding: 0 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.cart-list__items {
  max-height: 75%;
  overflow: auto;
}

.item-container {
  border-bottom: 1px solid #ededed;
  padding: 10px 0;
}

.item-info__img {
  width: 70px;
  height: 70px;
  margin-right: 10px;

  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
  background-size: contain;
  cursor: pointer;
}

.item-info__title {
  color: #333;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
}

.item-bottom {
  position: relative;
}

.prize-details {
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  width: 100%;
}

.item-info__remove {
  position: absolute;
  top: -2px;
  right: 0;
  cursor: pointer;
}

.item-info__remove::after {
  content: '\f2ed';
  font-family: 'Font Awesome 5 Free';
  font-size: 13px;
  font-weight: 900;
  color: #7f7f7f;
  margin-right: auto;
}

.cart-btn {
  width: 100%;
  margin: 15px 0;
  padding: 5px 0;
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

@media (min-width: 768px) {
  .cart-list__backdrop {
    background-color: transparent;
  }

  .cart-list__content {
    height: auto;
    margin-top: 56px;
  }

  .cart-list__items {
    max-height: 500px;
  }
}
</style>