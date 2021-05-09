<template>
  <div class="near">
    <div class="near-title">附近店铺</div>
    <router-link
      class="near-shop"
      v-for="shop in nearShop"
      :key="shop.id"
      :to="`/shop/${shop.id}`"
    >
      <ShopInfo :item="shop" :imgUrl="imgUrl"/>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

const useNearEffect = () => {
  const nearShop = ref([])
  const imgUrl = ref()
  const getNearList = async () => {
    const res = await get('/shop/hotlist')
    nearShop.value = res.data
    imgUrl.value = res.imgUrl
  }
  return { nearShop, imgUrl, getNearList }
}

export default {
  name: 'Near',
  components: {
    ShopInfo
  },
  setup () {
    const { nearShop, imgUrl, getNearList } = useNearEffect()
    getNearList()
    return {
      nearShop,
      imgUrl
    }
  }
}
</script>

<style lang="scss" scoped>
  .near {
    color: #333333;
    &-title {
      font-weight: bold;
      font-size:  .18rem;
      line-height: .25rem;
      margin: .16rem 0 .14rem 0;
    }
    &-shop {
      overflow: hidden;
      text-decoration: none;
      color: #333;
    }
  }
</style>
