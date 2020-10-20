<template>
  <div id="app">
    <app-header v-if="defaultRoute"></app-header>
    <router-view />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  computed: {
    defaultRoute() {
      return this.$store.state.defaultRoute;
    },
  },
  components: {
    AppHeader,
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
</style>
