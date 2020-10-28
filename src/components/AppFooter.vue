<template>
  <footer class="footer">
    <hr />

    <div class="d-flex justify-content-center pt-3">
      <a href="https://github.com/Billi0ns">
        <i class="fab fa-github-square"></i>
      </a>
      <a href="#">
        <i class="fab fa-instagram-square"></i>
      </a>
      <a href="#">
        <i class="fab fa-line"></i>
      </a>
    </div>

    <p class="footer-text ">資料、圖片皆源自網路</p>

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
  color: $blackish-grey;
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
