<template>
  <div class="demo">
    <h3>此页面为路由跳转页面展示</h3>
    <br>
    <h3>测试购物相关功能，请点击首页附近店铺</h3>
    <router-link to="/home">
      <button class="demo-button">点击返回</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Demo'
}
</script>

<style lang="scss" scoped>
  .demo {
    position: absolute;
    top: 0;
    right: 0;
    bottom: .5rem;
    left: 0;
    margin: auto;
    height: .5rem;
    width: 3rem;
    font-size: .14rem;
    text-align: center;
    h3 {
      color: #E93B3B;
    }
    &-button {
      width: 1rem;
      height: .38rem;
      border-radius: .07rem;
      border: none;
      outline: none;
      font-size: .14rem;
      background-color: #0091FF;
      color: #fff;
      margin-top: .3rem;
    }
  }
</style>
