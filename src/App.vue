<template>
  <div id="app">
    <app-header v-if="defaultRoute"></app-header>
    <router-view />
    <app-footer v-if="defaultRoute"></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  computed: {
    defaultRoute() {
      return this.$store.state.defaultRoute;
    },
  },
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  overflow-y: scroll;
}
</style>
