<template>
  <div class="docker">
    <router-link
      :to="item.path" tag="div"
      v-for="(item, idx) in dockerList"
      class="docker-item"
      :key="idx"
    >
      <div class="iconfont" v-html="item.icon"/>
      <div class="item-title">{{item.text}}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  setup () {
    const dockerList = [
      { path: '/home', icon: '&#xe600;', text: '首页' },
      { path: '/cart', icon: '&#xe60c;', text: '购物车' },
      { path: '/orderList', icon: '&#xe60d;', text: '订单' },
      { path: '/profile', icon: '&#xe72a;', text: '我的' }
    ]

    return {
      dockerList
    }
  }
}
</script>

<style lang="scss" scoped>
  .docker {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    padding: .07rem .18rem .02rem .18rem;
    width: 100%;
    height: .49rem;
    box-shadow: 0 -.01rem .01rem #F1F1F1;
    .router-link-active {
      color: #1FA4FC;
      .item-title {
        color: #1FA4FC;
      }
    }
    &-item {
      flex: 1;
      text-align: center;
      .item-title {
        font-size: .2rem;
        color: #333;
        transform: scale(.5, .5);
        transform-origin: center top;
      }
      .iconfont {
        font-size: .18rem;
      }
    }
  }
</style>
