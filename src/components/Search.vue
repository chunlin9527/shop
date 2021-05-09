<template>
  <div class="search">
    <div class="search-back iconfont" @click="handleBack">&#xe603;</div>
    <div class="search-content">
      <span class="search-content-icon iconfont">&#xe604;</span>
      <input class="search-content-text" type="text" placeholder="请输入商品名称搜索">
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Srarch',
  setup () {
    const router = useRouter()
    const handleBack = () => {
      router.back()
    }
    return {
      handleBack
    }
  }
}
</script>

<style lang="scss" scoped>
  .search {
    display: flex;
    margin: .16rem 0;
    height: .32rem;
    line-height: .32rem;
    &-back {
      width: .3rem;
      font-size: .2rem;
      color: #B6B6B6;
    }
    &-content {
      display: flex;
      flex: 1;
      background: #F5F5F5;
      border-radius: .16rem;
      &-icon {
        width: .44rem;
        font-size: .2rem;
        color: #B7B7B7;
        text-align: center;
      }
      &-text {
        padding-right: .12rem;
        width: 100%;
        line-height: .32rem;
        font-size: .14rem;
        border: none;
        outline: none;
        background: none;
        &::placeholder {
          color: #333;
        }
      }
    }
  }
</style>
