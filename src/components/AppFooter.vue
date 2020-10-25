<template>
  <footer class="footer">
    <hr />

    <div class="d-flex justify-content-center pt-3">
      <i class="fab fa-facebook-square"></i>
      <i class="fab fa-instagram-square"></i>
      <i class="fab fa-line"></i>
    </div>

    <p class="footer-text ">產品圖片來自<a href="#">1% bakery</a></p>

    <p class="footer-text pb-3">網站僅做個人練習，不具商業用途</p>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 20px;
}

.fab {
  font-size: 30px;
  padding: 0 10px;
  margin-bottom: 20px;
  cursor: pointer;
}

.footer-text {
  margin-bottom: 5px;
}

@media (min-width: 768px) {
  .footer {
    margin-top: 80px;
  }
}
</style>
