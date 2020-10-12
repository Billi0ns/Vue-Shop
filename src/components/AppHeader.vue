<template>
  <div>
    <b-navbar toggleable="md" type="light" variant="light">
      <b-navbar-brand href="#">商標</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">
            <router-link to="/" tag="li">首頁</router-link>
          </b-nav-item>
          <b-nav-item href="#">
            <router-link to="/products" tag="li">商品列表</router-link>
          </b-nav-item>
          <b-nav-item href="#">
            <router-link to="/aboutUs" tag="li">關於我們</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">
            <router-link to="/cart" tag="li">購物車</router-link>
          </b-nav-item>
          <b-nav-item href="#" @click="handleLogin">
            後台管理
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <app-login></app-login>
  </div>
</template>

<script>
import AppLogin from '@/components/AppLogin.vue';
import { fb } from '../firebase';

export default {
  data() {
    return {
      adminSignedIn: fb.auth().currentUser,
    };
  },
  methods: {
    handleLogin() {
      if (this.adminSignedIn) {
        this.$router.push('admin');
      } else {
        this.$bvModal.show('login-modal');
      }
    },
  },
  components: {
    AppLogin,
  },
};
</script>

<style lang="scss" scoped></style>
