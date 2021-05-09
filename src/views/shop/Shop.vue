<template>
  <div class="wrapper">
    <Search />
    <ShopInfo :item="item" :imgUrl="imgUrl"/>
  </div>
  <Content />
  <CartList />
</template>

<script>
import Search from '../../components/Search'
import ShopInfo from '../../components/ShopInfo'
import Content from './Content'
import CartList from './CartList'

export default {
  name: 'Shop',
  components: {
    ShopInfo,
    Search,
    Content,
    CartList
  },
  setup () {
    const imgUrl = 'https://i.loli.net/2021/04/20/SpxQRHzIvgfZ9bi.png'
    const item = {
      id: 1,
      name: '沃尔玛',
      slogan: 'VIP尊享满89元减6元运费券'
    }
    return {
      imgUrl,
      item
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 0 .18rem;
  }
</style>
