<template>
  <div v-if="!loading">
    <app-header></app-header>
    <app-progress-bar :badgeNum="badgeNum"></app-progress-bar>

    <div class="row mx-auto">
      <div class="col-md-9 col-lg-7 mx-auto">
        <div class="cart-items">
          <h1 class="cart-items-title">購買清單（{{ cartItems.length }}件）</h1>

          <div class="mobile-view">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="item-container "
            >
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
              <div class="item-price">
                單價：{{ item.price | formatNumber }}
              </div>
              <div class="item-bottom">
                <div>購買數量：{{ item.amount }}</div>
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
                  {{ item.amount }}
                </td>

                <td>{{ (item.price * item.amount) | formatNumber }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="row mt-md-3 mx-auto">
      <div class="col-md-9 col-lg-7 mx-auto">
        <div class="order">
          <h1 class="order-title">
            訂單資料
          </h1>

          <div class="item-container">
            <div class="d-flex justify-content-between mb-2">
              <div>顧客名稱：</div>
              <div>{{ orderInfo.form.name }}</div>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <div>電子信箱：</div>
              <div>{{ orderInfo.form.email }}</div>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <div>電話號碼：</div>
              <div>{{ orderInfo.form.phone }}</div>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <div>運送地址：</div>
              <div>{{ orderInfo.form.address }}</div>
            </div>
            <div class="d-flex  justify-content-between mb-2">
              <div>訂單金額:</div>
              <div>{{ orderInfo.total | formatNumber }}</div>
            </div>

            <div class="d-flex   justify-content-between">
              <div>付款狀態:</div>
              <div v-if="!orderInfo.isPayed" class="notPayed">尚未付款</div>
              <div v-else class="payed">付款完成</div>
            </div>

            <b-button
              v-if="!orderInfo.isPayed"
              class="order-btn mt-3"
              @click="completePayment"
              >前往付款</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppProgressBar from '@/components/AppProgressBar.vue';
import { db } from '../firebase';

export default {
  name: 'Payment',
  components: {
    AppHeader,
    AppProgressBar,
  },
  data() {
    return {
      orderInfo: [],
      loading: false,
    };
  },
  computed: {
    cartItems() {
      return this.orderInfo.cartItems;
    },
    currentCheckout() {
      return this.$store.state.currentCheckout;
    },
    badgeNum() {
      if (this.orderInfo.isPayed) {
        return 3;
      }
      return 2;
    },
  },
  methods: {
    handleUrl(item) {
      this.$store.commit('setCurrentProduct', item);
      this.$router.push({ path: `/products/${item.id}` });
    },
    getOrderInfo() {
      this.loading = true;

      db.collection('orders')
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            this.orderInfo = doc.data();
          } else {
            console.log('No such document!');
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log('Error getting document:', error);
          this.loading = false;
        });
    },
    completePayment() {
      db.collection('orders')
        .doc(this.$route.params.id)
        .update({
          isPayed: true,
        })
        .then(() => {
          console.log('Document successfully updated!');
          this.getOrderInfo();
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error);
        });
    },
  },
  created() {
    this.getOrderInfo();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/Order.scss';

.payed,
.notPayed {
  font-weight: bold;
}

.notPayed {
  color: #dc3545;
}

.payed {
  color: #28a745;
}
</style>
