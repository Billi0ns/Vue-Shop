<template>
  <div class="home">
    <div class="px-0 container-md">
      <img src="../assets/hero-image.jpg" class="hero-image mb-3" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  created() {
    this.$store.commit('changeDefaultRoute', true);
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
