<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('changeDefaultRoute', false);
  },
};
</script>

<style lang="scss" scoped></style>
