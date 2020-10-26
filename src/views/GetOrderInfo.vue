<template>
  <div class="container">
    <div class="row">
      <div role="group" class="input-container  mx-auto">
        <label for="order-search" class="font-weight-bold">
          請輸入訂單號碼：
        </label>
        <b-form-input
          id="order-search"
          v-model="orderId"
          @keydown.enter="searchOrder"
        ></b-form-input>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';

export default {
  data() {
    return {
      orderId: '',
    };
  },
  methods: {
    searchOrder() {
      db.collection('orders')
        .doc(this.orderId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            this.$router.push(`/orderInfo/${this.orderId}`);
          } else {
            alert('查無此訂單！');
            this.orderId = '';
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #f6f7f8 url('../assets/background__small.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 100px 50px;
  margin: 0 auto;
  opacity: 0.6;
}

.input-container {
  padding: 20px;
  background-color: hsla(0, 0%, 100%, 0.7);
  border-radius: 5px;
}

@media (min-width: 768px) {
  .container {
    padding: 200px 100px;
    background: #f6f7f8 url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
