<template>
  <div class="cart-list " @click="hideCartList">
    <div
      class="cart-list__content"
      @mouseover="focusStatus = true"
      @mouseleave="focusStatus = false"
      @touchstart="focusStatus = true"
      @click.stop
    >
      <div class="cart-list__items">
        <transition-group name="slide">
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
        </transition-group>
      </div>

      <div @click="hideCartList">
        <router-link to="/cart" tag="button" class="cart-btn">
          訂單結帳
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focusStatus: false,
      timeoutID: null,
      timeoutEnded: false,
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
      this.$router.push({ path: `/products/${item.id}` }).catch((error) => {
        if (error.name !== 'NavigationDuplicated') {
          throw error;
        }
      });
    },
  },
  created() {
    this.timeoutID = setTimeout(() => {
      if (!this.focusStatus) {
        this.$store.commit('toggleCartListSlider', false);
      }
      this.timeoutEnded = true;
    }, 3000);
  },
  watch: {
    focusStatus() {
      if (this.timeoutEnded) {
        this.$store.commit('toggleCartListSlider', false);
      }
    },
  },
  beforeDestroy() {
    window.clearTimeout(this.timeoutID);
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/Transition.scss';

.cart-list {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.cart-list__content {
  position: relative;
  z-index: 11;
  background-color: #fefefe;
  width: 80%;
  max-width: 300px;
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
  background-size: contain;
  overflow: hidden;
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
    margin-top: 86px;
  }

  .cart-list__items {
    max-height: 500px;
  }
}
</style>
