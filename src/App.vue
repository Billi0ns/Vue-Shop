<template>
  <div id="app">
    <app-header v-if="defaultRoute"></app-header>
    <div v-if="defaultRoute" class="fixed-top-padding"></div>

    <!-- <keep-alive include="Home">
      <router-view />
    </keep-alive> -->

    <keep-alive include="Home">
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>

    <transition name="component-fade" mode="out-in">
      <router-view
        v-if="!$route.meta.keepAlive"
        :key="$route.name + ($route.params.id || null)"
      ></router-view>
    </transition>

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

.fixed-top-padding {
  padding-top: 80px;
}

@media (min-width: 768px) {
  .fixed-top-padding {
    padding-top: 100px;
  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
