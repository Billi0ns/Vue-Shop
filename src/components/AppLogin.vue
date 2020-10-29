<template>
  <b-modal id="login-modal" centered title="管理者登入" ref="login-modal">
    <b-form-group
      description="訪客帳號： visitor@test.com (P.S. 訪客只有讀取權限，無法寫入資料庫)"
    >
      <b-form-input placeholder="Email Address" v-model="email"></b-form-input>
    </b-form-group>
    <b-form-group description="訪客密碼： visitorpw456">
      <b-form-input
        placeholder="Password"
        type="password"
        v-model="password"
        @keyup.enter="login"
      ></b-form-input>
    </b-form-group>

    <template v-slot:modal-footer="{}">
      <b-button size="md" variant="primary" @click="login" class="btn-block">
        Sign In
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { fb } from '../firebase';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$refs['login-modal'].hide();
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: 'Admin' });
        })
        .catch((error) => {
          alert('該用戶不存在或密碼錯誤');
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
