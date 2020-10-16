<template>
  <b-container fluid="md" class="mt-3">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">訂單編號</th>
          <th scope="col">產品名稱</th>
          <th scope="col">總金額</th>
          <th scope="col">付款狀態</th>
          <th scope="col">訂單日期</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>
            {{ getItemsList(order.cartItems) }}
          </td>
          <td>{{ order.total | formatNumber }}</td>
          <td>{{ order.isPayed }}</td>
          <td>{{ getReadableDate(order.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
import { db } from '../firebase';

export default {
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    getReadableDate(timestamp) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString('zh-tw');
    },
    getItemsList(cartItems) {
      let result = '';

      // eslint-disable-next-line array-callback-return
      cartItems.map((item) => {
        result += `${item.title} x ${item.amount}\n`;
      });

      return result;
    },
  },
  created() {
    db.collection('orders')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        this.orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("All data in 'orders' collection", this.orders);
      });
  },
};
</script>

<style lang="scss" scoped>
td {
  white-space: pre;
}
</style>
