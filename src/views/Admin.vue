<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="#">Vue-shop</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">
            <router-link to="/admin" tag="li">產品管理</router-link>
          </b-nav-item>
          <b-nav-item href="#">
            <router-link to="/admin/orders" tag="li">訂單管理</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item href="#">
              <router-link to="/" tag="li">回到首頁</router-link>
            </b-nav-item>

            <b-nav-item href="#" @click="logout">
              登出
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view></router-view>
  </div>
</template>

<script>
import { fb } from '../firebase';

export default {
  methods: {
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: 'Home' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
