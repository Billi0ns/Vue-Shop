<template>
  <b-container fluid="md" class="mt-3">
    <div class="table-responsive">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">訂單編號</th>
            <th scope="col">產品名稱</th>
            <th scope="col">總金額</th>
            <th scope="col">付款狀態</th>
            <th scope="col">訂單日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>
              {{ getItemsList(order.cartItems) }}
            </td>
            <td>{{ order.total | formatNumber }}</td>
            <td v-if="order.isPayed" class="payed">已付款</td>
            <td v-else class="notPayed">尚未付款</td>
            <td>{{ getReadableDate(order.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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

      cartItems.forEach((item) => {
        result += `${item.title} x ${item.amount}\n`;
      });

      result = result.slice(0, -1);
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
      });
  },
};
</script>

<style lang="scss" scoped>
td {
  white-space: pre;
}

.payed,
.notPayed {
  font-weight: bold;
}

.notPayed {
  color: #6c757d;
}

.payed {
  color: #28a745;
}
</style>
