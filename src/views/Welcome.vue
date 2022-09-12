<template>
  <div class="welcome">
    <div class="content">
      <div class="title">后台管理系统</div>
      <div class="subtitle">--基于vue3+ element plus +koa2</div>
    </div>
    <div class="img"></div>

  </div>
</template>

<script>



export default {


}
</script>

<style scoped lang="scss">
.welcome {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #fff;
  position: relative;

  .content {
    .title {
      font-size: 40px;
      line-height: 62px;
      font-weight: bolder;
      color: #3c9566;

    }

    .subtitle {
      margin-left: 50px;
      font-size: 14px;
      color: gray;
    }
  }

  .img {
    position: absolute;
    right: 0;
    bottom: 0;
    background-image: url('../assets/images/welcome.png');
    width: 378px;
    height: 438px;
  }
}
</style>