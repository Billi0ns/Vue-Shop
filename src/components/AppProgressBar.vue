<template>
  <div class="form-progress-bar">
    <div class="badge-line"></div>
    <div class="myBadge">
      <div class="badge--finished">1</div>
      <div>填寫資料</div>
    </div>

    <div class="myBadge middle-badge">
      <div v-if="secondFinished" class="badge--finished ">2</div>
      <div v-else class="badge--unfinished ">2</div>
      <div>進行付款</div>
    </div>

    <div class="myBadge">
      <div v-if="thirdFinished" class="badge--finished">3</div>
      <div v-else class="badge--unfinished">3</div>
      <div>訂單完成</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    badgeNum: Number,
  },
  computed: {
    secondFinished() {
      return this.badgeNum >= 2;
    },
    thirdFinished() {
      return this.badgeNum >= 3;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-progress-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 500px;
  height: auto;
  margin: 20px auto;
  position: relative;
}

.badge-line {
  position: absolute;
  top: 14px;
  left: 4%;
  width: 92%;
  height: 2px;
  margin: 0 auto;
  background: $light-grey;
}

.myBadge {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 75%;
  font-weight: 700;
}

.badge--finished,
.badge--unfinished {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.badge--finished {
  background: #9eaab2;
}

.badge--unfinished {
  background: $light-grey;
}

.middle-badge {
  margin: 0 auto;
}
</style>
