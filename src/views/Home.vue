<template>
  <div class="home">
    <router-link to="/admin">Admin</router-link>
    <app-login></app-login>
  </div>
</template>

<script>
// @ is an alias to /src
import AppLogin from '@/components/AppLogin.vue';

export default {
  name: 'Home',
  components: {
    AppLogin,
  },
};
</script>
