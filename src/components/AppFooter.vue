<template>
  <footer class="footer">
    <hr />

    <div class="d-flex justify-content-center pt-3">
      <a href="#">
        <i class="fab fa-line"></i>
      </a>
      <a href="#">
        <i class="fab fa-facebook-square"></i>
      </a>
      <a href="#">
        <i class="fab fa-instagram-square"></i>
      </a>
    </div>

    <p class="footer-text">
      Copyright © 2020 Billi0ns
      <a href="https://github.com/Billi0ns">
        <i class="fab fa-github" id="fa-github"></i>
      </a>
    </p>

    <p class="footer-text pb-5">網站僅個人學習使用，無商業用途</p>
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

#fa-github {
  font-size: 18px;
  padding: 0;
  margin-bottom: 0;

  &:hover {
    transform: rotate(360deg);
    transition: all 0.8s ease;
  }
}

.footer-text {
  margin: 0 auto;
  margin-bottom: 5px;
  line-height: 20px;
}

@media (min-width: 768px) {
  .footer {
    margin-top: 80px;
  }
}
</style>
