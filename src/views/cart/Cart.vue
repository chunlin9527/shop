<template>
  <div class="cartTitle">我的购物车</div>
  <div class="wrapper">
    <div
      class="product"
      v-for="(item, index) in cartProductList"
      :key="index"
    >
      <div class="product-shopName">沃尔玛{{item.id}}</div>

      <div
        class="product-item"
        v-for="(innerItem, index) in item.list"
        :key="index"
      >
        <img class="product-item-img" :src="innerItem.imgUrl" alt="">

        <div class="product-item-info">
          <h3 class="product-item-name">{{innerItem.name}}</h3>
          <div class="product-item-price">¥{{innerItem.price}} x {{innerItem.count}}</div>
          <span class="product-item-totalPrice">&yen;{{innerItem.totalPrice}}</span>
        </div>
      </div>
    </div>
  </div>
  <Docker />
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Docker from '../../components/Docker'

const useCartEffect = () => {
  const store = useStore()
  const cartList = store.state.cartList

  // 计算每个店铺购物车商品
  const cartProductList = computed(() => {
    const result = []
    for (const shopId in cartList) {
      const shopProduct = {
        id: '',
        list: []
      }
      shopProduct.id = shopId
      for (const k in cartList[shopId]) {
        if (cartList[shopId][k].count > 0) {
          // 计算单个商品总价格
          cartList[shopId][k].totalPrice = (cartList[shopId][k].count * cartList[shopId][k].price).toFixed(2)
          shopProduct.list.push(cartList[shopId][k])
          shopProduct.totalPrice += cartList[shopId][k].count * cartList[shopId][k].price
        }
      }
      if (shopProduct.list.length > 0) {
        result.push(shopProduct)
      }
    }
    // console.log(result)
    return result
  })

  return { cartProductList }
}

export default {
  name: 'Cart',
  components: {
    Docker
  },
  setup () {
    const { cartProductList } = useCartEffect()

    return {
      cartProductList
    }
  }
}
</script>

<style lang="scss" scoped>
  .cartTitle {
    font-size: .16rem;
    color: #333333;
    text-align: center;
    padding: .3rem 0 .1rem 0;
    background-color: #fff;
  }
  .wrapper {
    overflow-y: scroll;
    position: absolute;
    top: .8rem;
    right: 0;
    bottom: .5rem;
    left: 0;
    background-color: #f8f8f8;
    padding: 0 .18rem 0 .18rem;
  }
  .product {
    padding: 0 .16rem;
    margin-top: .16rem;
    background-color: #fff;
    &-shopName {
      padding: .16rem 0;
      font-size: .16rem;
      color: #333333;
    }
    &-item {
      display: flex;
      padding-bottom: .16rem;
      &-img {
        width: .46rem;
        height: .46rem;
      }
      &-info {
        position: relative;
        flex: 1;
        padding-left: .16rem;
        height: .46rem;
      }
      &-name {
        font-size: .14rem;
        color: #333333;
        margin-bottom: .06rem;
      }
      &-price {
        font-size: .12rem;
        color: #E93B3B;
        line-height: .2rem;
      }
      &-totalPrice {
        position: absolute;
        top: .15rem;
        right: 0;
        font-size: .14rem;
        color: #000000;
      }
    }
  }
</style>
