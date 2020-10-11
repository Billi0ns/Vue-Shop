<template>
  <div class="home">
    <app-header></app-header>
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from '@/components/AppHeader.vue';
// import AppLogin from '@/components/AppLogin.vue';

export default {
  name: 'Home',
  components: {
    AppHeader,
    // AppLogin,
  },
};
</script>
