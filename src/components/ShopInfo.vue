<template>
  <img class="item-img" :src="imgUrl" alt="">
  <div class="item-text">
    <p class="item-text-name">{{item.name}}</p>
    <p class="item-text-info">
      <span class="tags">月售1万+</span>
      <span class="tags">起送¥0</span>
      <span class="tags">基础运费¥6</span>
    </p>
    <p class="item-text-slogan">{{item.slogan}}</p>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'imgUrl']
}
</script>

<style lang="scss" scoped>
  .item-img {
    float: left;
    width: .56rem;
    border-radius: 50%;
    margin-right: .16rem;
    padding: .12rem 0;
  }
  .item-text {
    box-sizing: border-box;
    overflow: hidden;
    font-size: .13rem;
    padding: .12rem 0;
    color: #333;
    &-name {
      font-size: .16rem;
    }
    &-info {
      margin: .08rem 0;
      .tags:not(:last-child) {
        margin-right: .16rem;
      }
    }
    &-slogan {
      white-space: nowrap;
      color: #E93B3B;
    }
  }
</style>
