<template>
  <main class="notfound">
    <h1 class="notfound-404">404</h1>
    <h2 class="notfound-sentence">糟糕！你所尋找的頁面並不存在</h2>
    <router-link to="/" tag="button" class="notfound-btn">
      回到首頁
    </router-link>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.notfound {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.notfound-404 {
  font-family: 'Montserrat', sans-serif;
  font-size: 90px;
  font-weight: 700;
  color: #232323;
}

.notfound-sentence {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #232323;
  width: 100%;
}

.notfound-btn {
  padding: 10px 40px;
  font-weight: 700;
  background-color: #fd644e;
  color: white;
  border-radius: 30px;
  border: 1px solid transparent;
  transition: all 0.2s ease-out;

  &:hover {
    color: #fd644e;
    background-color: white;
    border: 1px solid #fd644e;
  }
}

@media (min-width: 768px) {
  .notfound-404 {
    font-size: 140px;
  }

  .notfound-sentence {
    font-size: 25px;
  }
}
</style>
