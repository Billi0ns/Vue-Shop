<template>
  <div class="container">
    <app-progress-bar :badgeNum="1"></app-progress-bar>

    <div v-if="cartItems.length === 0" class="row mx-auto">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto mt-4">
        <i class="fas fa-shopping-cart"></i>
        <h5 class="font-weight-bold">你的購物車是空的</h5>
        <p class="mb-5">記得加入商品到你的購物車</p>

        <router-link to="/products" tag="button" class="order-btn">
          繼續購物
        </router-link>
      </div>
    </div>
    <div v-else>
      <div class="cart-items">
        <h1 class="cart-items-title">購物車（{{ cartItems.length }}件）</h1>

        <div class="mobile-view">
          <div v-for="item in cartItems" :key="item.id" class="item-container ">
            <div class="item-info">
              <img
                class="item-info__img"
                :src="item.imageFile"
                alt=""
                @click="handleUrl(item)"
              />
              <div class="item-info__title" @click="handleUrl(item)">
                {{ item.title }}
              </div>
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
                小計：{{ (item.price * item.amount) | formatNumber }}
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
                  <img
                    class="item-info__img"
                    :src="item.imageFile"
                    alt=""
                    @click="handleUrl(item)"
                  />
                  <div class="item-info__title" @click="handleUrl(item)">
                    {{ item.title }}
                  </div>
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

      <div class="row mt-lg-4">
        <div class="col-lg-6">
          <div class="order">
            <h1 class="order-title">
              訂單資料
            </h1>

            <div class="item-container">
              <div class="d-flex mb-2">
                <div>小計:</div>
                <div class="ml-auto">{{ subtotal | formatNumber }}</div>
              </div>
              <div class="d-flex mb-2">
                <div>運費: (滿$999免運費)</div>
                <div class="ml-auto">{{ shippingCost | formatNumber }}</div>
              </div>
              <hr class="hr-line" />
              <div class="d-flex font-weight-bold ">
                <div class="mb-2">合計:（{{ cartItems.length }}件）</div>
                <div class="ml-auto">{{ total | formatNumber }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="order">
            <h1 class="order-title">
              送貨資料
            </h1>

            <div class="item-container">
              <b-form @submit="onSubmit" class="text-left order-form">
                <b-form-group
                  id="input-group-1"
                  label="顧客名稱"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.name"
                    type="text"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  label="電子信箱"
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.email"
                    type="email"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback :state="emailValidation">
                    請輸入有效的電子郵件地址
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                  id="input-group-3"
                  label="電話號碼"
                  label-for="input-3"
                >
                  <b-form-input
                    id="input-3"
                    v-model="form.phone"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback :state="phoneValidation">
                    請輸入正確手機格式 （10碼）
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                  id="input-group-4"
                  label="地址"
                  label-for="input-4"
                >
                  <b-form-input
                    id="input-4"
                    v-model="form.address"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-button type="submit" class="order-btn">前往結帳</b-button>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppProgressBar from '@/components/AppProgressBar.vue';
import { db } from '../firebase';

export default {
  data() {
    return {
      form: {
        name: null,
        email: null,
        phone: null,
        address: null,
      },
      currentCheckout: '',
    };
  },
  computed: {
    cartItems() {
      return this.$store.state.cartItems;
    },
    subtotal() {
      let sum = 0;

      // eslint-disable-next-line array-callback-return
      this.cartItems.map((item) => {
        sum += item.amount * item.price;
      });
      return sum;
    },
    shippingCost() {
      if (this.subtotal >= 999) {
        return 0;
      }
      return 60;
    },
    total() {
      return this.subtotal + this.shippingCost;
    },
    phoneValidation() {
      const phoneNum = this.form.phone;
      if (phoneNum === null) {
        return null;
      }
      if (phoneNum.length === 10) {
        return true;
      }
      return false;
    },
    emailValidation() {
      const { email } = this.form;
      // eslint-disable-next-line no-useless-escape
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (email === null) {
        return null;
      }
      if (re.test(email)) {
        return true;
      }
      return false;
    },
  },
  methods: {
    deleteItemHandler(id) {
      this.$store.commit('deleteCartItem', id);
    },
    updateCart(payload) {
      this.$store.commit('updateCart', payload);
    },
    handleUrl(item) {
      this.$store.commit('setCurrentProduct', item);
      this.$router.push({ path: `/products/${item.id}` });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.sendOrder();
    },
    sendOrder() {
      db.collection('orders')
        .add({
          createdAt: new Date(Date.now()),
          cartItems: this.cartItems,
          form: this.form,
          total: this.total,
          id: null,
          isPayed: false,
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          db.collection('orders')
            .doc(docRef.id)
            .update({
              id: docRef.id,
            });
          this.$router.push(`/orderInfo/${docRef.id}`);
          this.$store.commit('resetCart');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    },
  },
  components: {
    AppProgressBar,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/Order.scss';

.fa-shopping-cart {
  font-size: 100px;
  color: #cccccc;
  margin-bottom: 15px;
}
</style>
