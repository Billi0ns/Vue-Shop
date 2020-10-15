<template>
  <div class="home">
    <app-header></app-header>

    <img src="../assets/hero-image.jpg" class="hero-image mb-3" alt="" />
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'Home',
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss" scoped>
.hero-image {
  width: 100%;
  max-width: 1200px;
  height: auto;
  max-height: 600px;
  object-fit: cover;
}
</style>
