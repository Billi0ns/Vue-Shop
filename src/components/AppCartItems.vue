<template>
  <div class="container">
    <div class="cart-items">
      <h1 class="cart-items-title">購物車（{{ cartItems.length }}件）</h1>

      <div class="mobile-view">
        <div v-for="item in cartItems" :key="item.id" class="item-container ">
          <div class="item-info">
            <img class="item-info__img" :src="item.imageFile" alt="" />
            <div class="item-info__title">{{ item.title }}</div>
            <div
              class="item-info__remove"
              @click="deleteItemHandler(item.id)"
            ></div>
          </div>
          <div class="item-price">單價：{{ item.price | formatNumber }}</div>
          <div class="item-bottom">
            <b-form-spinbutton
              v-model="item.amount"
              min="1"
              max="30"
              style="width: 9rem"
              @change="updateCart({ id: item.id, amount: item.amount })"
            ></b-form-spinbutton>
            <div class="item-price">
              合計：{{ (item.price * item.amount) | formatNumber }}
            </div>
          </div>
        </div>
      </div>

      <table class="table mt-3 desktop-view">
        <thead>
          <tr>
            <th scope="col" class="text-left title-header">
              商品資料
            </th>
            <th scope="col">單件價格</th>
            <th scope="col">數量</th>
            <th scope="col">小計</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>
              <div class="item-info">
                <img class="item-info__img" :src="item.imageFile" alt="" />
                <div class="item-info__title">{{ item.title }}</div>
              </div>
            </td>
            <td>{{ item.price | formatNumber }}</td>
            <td>
              <b-form-spinbutton
                v-model="item.amount"
                min="1"
                max="30"
                @change="updateCart({ id: item.id, amount: item.amount })"
              ></b-form-spinbutton>
            </td>

            <td>{{ (item.price * item.amount) | formatNumber }}</td>
            <td class="remove-container">
              <div
                class="item-info__remove"
                @click="deleteItemHandler(item.id)"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartItems() {
      return this.$store.state.cartItems;
    },
  },
  methods: {
    deleteItemHandler(id) {
      this.$store.commit('deleteCartItem', id);
      this.$_makeToast('已刪除購物車產品');
    },
    updateCart(payload) {
      this.$store.commit('updateCart', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-items {
  border: 1px solid #ededed;
}
.cart-items-title {
  font-size: 18px;
  background: #f6f6f6;
  margin-bottom: 0;
  padding: 10px;
  text-align: left;
}

.item-container {
  border-bottom: 1px solid #ededed;
  padding: 10px;
  padding-right: 15px;
}

.item-info {
  display: flex;
  align-items: center;
  position: relative;
}

.item-info__img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}

.item-info__title {
  color: #333;
  font-size: 14px;
}

.item-info__remove {
  position: absolute;
  top: -5px;
  right: 0;
  cursor: pointer;
}

.item-info__remove::after {
  content: '\f00d';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  color: #7f7f7f;
  margin-right: auto;
}

.item-price {
  text-align: right;
  font-size: 14px;
  font-weight: bold;
}

.item-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.desktop-view {
  display: none;
}

.title-header {
  padding-left: 6rem;
}

@media (min-width: 768px) {
  .mobile-view {
    display: none;
  }

  .desktop-view {
    display: table;
  }

  .cart-items-title {
    margin-bottom: -16px;
  }

  .table th {
    border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
    font-size: 14px;
    font-weight: 500;
  }

  .table td {
    vertical-align: middle;
    border-top: 1px solid #ededed;
  }

  .item-info__img {
    width: 70px;
    height: 70px;
  }

  .remove-container {
    position: relative;
  }

  .item-info__remove {
    top: 37%;
    right: 15px;
  }
}
</style>
