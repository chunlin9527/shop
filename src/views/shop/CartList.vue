<template>
  <div class="mask" v-if="cartShow"></div>
  <div class="product" v-if="cartShow">
    <div class="product-top">
      <span
        class="iconfont product-top-item product-top-left"
        v-html="allChecked ? '&#xe6fa;' : '&#xe605;'"
        @click="() => handleCheckAll(shopId, allChecked)"
      >
      </span>
      <span class="product-top-item product-top-text">全选</span>
      <span
        class="product-top-item product-top-right"
        @click="clearCart"
      >清空购物车
      </span>
    </div>

    <div class="product-item"
      v-for="item in cartProduct"
      :key="item.id"
    >
      <div
        class="iconfont product-item-input"
        @click="() => handleIconCheck(shopId, item.id)"
        v-html="item.isChecked ? '&#xe6fa;' : '&#xe605;'"
      >
      </div>
      <img class="product-item-img" :src="item.imgUrl" alt="">

      <div class="product-item-detail">
        <h4 class="product-item-name">{{item.name}}</h4>
        <span class="product-item-yen">&yen;</span>
        <span class="product-item-price">{{item.price}}</span>
        <span class="product-item-oldPrice">&yen;{{item.oldPrice}}</span>
      </div>

      <div class="product-number">
        <span class="number-item number-minus iconfont" @click="() => changeCartItem(shopId, item.id, item, -1)">&#xe608;</span>
        <span class="number-item number-count iconfont">
          {{cartList?.[shopId]?.[item.id]?.count || 0}}
        </span>
        <span class="number-item number-plus iconfont" @click="() => changeCartItem(shopId, item.id, item, 1)">&#xe63b;</span>
      </div>
    </div>
  </div>

  <div class="cart">
    <img
      class="cart-img"
      src="https://i.loli.net/2021/04/22/VwMt7hQNBF9UTXO.png" alt=""
      @click="handleCartShow"
      >
    <span class="cart-tag">{{ TagCount }}</span>
    <span class="cart-total">总计：
      <span class="cart-totalPrice">&yen; {{ totalPrice }}</span>
    </span>

    <span class="cart-go" @click="toConfirmation">去结算</span>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

const useCartListEffect = (shopId, cartShow) => {
  const store = useStore()
  const cartList = store.state.cartList

  // 计算单个店铺购物车商品数量
  const TagCount = computed(() => {
    const productList = cartList[shopId]
    // productList放在外面会失去响应式?
    // console.log(productList)
    let count = 0
    if (productList) {
      const keys = Object.keys(productList)
      for (const key of keys) {
        if (productList[key].count > 0) {
          count++
        }
      }
    }
    return count
  })

  // 计算总价格
  const totalPrice = computed(() => {
    const productList = cartList[shopId]
    let price = 0
    if (productList) {
      const keys = Object.keys(productList)
      for (const k of keys) {
        if (productList[k].isChecked) {
          price += productList[k].price * productList[k].count
        }
      }
    }
    return price.toFixed(2)
  })

  // 计算购物车里需要展示的商品
  const cartProduct = computed(() => {
    const productList = cartList[shopId] || {}
    const cartProductList = []
    const keys = Object.keys(productList)
    // console.log(keys)
    for (const k of keys) {
      if (productList[k].count > 0) {
        cartProductList.push(productList[k])
      }
    }
    return cartProductList
  })

  // 单个商品勾选状态
  const handleIconCheck = (shopId, productId) => {
    store.commit('handleIconCheck', { shopId, productId })
  }

  // 计算全选状态
  const allChecked = computed(() => {
    const productList = cartList[shopId]
    let state = true
    if (productList) {
      const keys = Object.keys(productList)
      for (const k of keys) {
        if (productList[k].count > 0 && !productList[k].isChecked) {
          state = false
        }
      }
    }
    return state
  })

  // 点击全选更改单个产品选择状态
  const handleCheckAll = (shopId, allChecked) => {
    store.commit('handleCheckAll', { shopId, allChecked })
  }

  // 清空购物车
  const clearCart = () => {
    store.commit('clearCart', { shopId })
  }

  // 购物车展示细节
  const handleCartShow = () => {
    if (cartProduct.value.length > 0) {
      cartShow.value = !cartShow.value
    }
    // console.log(cartShow.value)
  }

  // 如果购物车产品为空，cartShow值该为false
  const cartProductCount = watchEffect(() => {
    const newAry = cartProduct.value.filter(val => {
      return val.count > 0
    })
    if (newAry.length === 0) {
      cartShow.value = false
    }
  })

  return { TagCount, totalPrice, cartProduct, handleIconCheck, allChecked, handleCheckAll, clearCart, handleCartShow, cartProductCount }
}

export default {
  name: 'CartList',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const shopId = route.params.id
    const cartShow = ref(false)
    const { TagCount, totalPrice, cartProduct, handleIconCheck, allChecked, handleCheckAll, clearCart, handleCartShow, cartProductCount } = useCartListEffect(shopId, cartShow)
    const { cartList, productList, changeCartItem } = useCommonCartEffect(shopId)

    // 结算
    const toConfirmation = () => {
      if (productList.value.length > 0) {
        router.push(`/confirmation/${shopId}`)
      }
    }

    return {
      shopId,
      TagCount,
      totalPrice,
      cartProduct,
      handleIconCheck,
      cartList,
      productList,
      changeCartItem,
      allChecked,
      handleCheckAll,
      clearCart,
      cartShow,
      handleCartShow,
      cartProductCount,
      toConfirmation
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixins.scss';

  //遮罩
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.50);
    z-index: 1;
  }

  // 已加购物车产品样式
  .product {
    position: absolute;
    left: 0;
    right: 0;
    bottom: .5rem;
    padding: 0 .18rem .16rem;
    background-color: #fff;
    z-index: 2;
    // 购物车顶端样式
    &-top {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 100%;
      height: .5rem;
      border-bottom: .01rem solid #F1F1F1;
      background-color: #fff;
      overflow: hidden;
      &-item {
        line-height: .5rem;
        font-size: .14rem;
        color: #333;
      }
      &-left {
        float: left;
        margin: 0 .1rem 0 .18rem;
        font-size: .2rem;
        color: #0091FF;
      }
      &-right {
        float: right;
        margin-right: .18rem;
      }
    }

    &-item {
      position: relative;
      display: flex;
      margin-top: .16rem;
      width: 100%;
      &-input {
        width: .16rem;
        height: .16rem;
        margin: .15rem 0;
        font-size: .2rem;
        color: #0091FF;
      }
      &-img {
        width: .46rem;
        height: .46rem;
        margin: 0 .16rem;
      }
      &-detail {
        flex: 1;
        position: absolute;
        height: .46rem;
        top: 0;
        bottom: 0;
        left: 1.16rem;
      }
      &-name {
        font-size: .14rem;
        color: #333333;
        height: .2rem;
        line-height: .2rem;
      }
      &-yen {
        display: inline-block;
        @include fontSize;
        color: #E93B3B;
        font-weight: bold;
      }
      &-price {
        font-size: .14rem;
        color: #E93B3B;
        font-weight: bold;
        vertical-align: .02rem;
      }
      &-oldPrice {
        position: absolute;
        left: .36rem;
        font-size: .2rem;
        color: #999999;
        transform: scale(.5);
        transform-origin: center;
        text-decoration: line-through;
      }
    }
  }
  // 购物车里按钮样式
  .product-number {
    position: absolute;
    right: 0;
    height: .46rem;
    color: #333;
    line-height: .46rem;
    .number-item {
      font-size: .2rem;
    }
    .number-count {
      display: inline-block;
      width: .2rem;
      font-size: .14rem;
      margin: 0 .05rem;
      vertical-align: .01rem;
      text-align: center;
    }
    .number-plus {
      color: #0091FF;
    }
  }

  // 购物车基本样式
  .cart {
    display: flex;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .49rem;
    border-top: .01rem solid #F1F1F1;
    background-color: #fff;
    z-index: 3;
    span {
      display: inline-block;
      font-size: .14rem;
      color: #333333;
      line-height: .49rem;
      vertical-align: -.02rem;
    }
    &-img {
      display: block;
      width: .28rem;
      height: .26rem;
      margin: .12rem .24rem;
    }
    .cart-tag {
      position: absolute;
      left: .5rem;
      top: .06rem;
      width: .24rem;
      height: .24rem;
      font-size: .2rem;
      line-height: .24rem;
      text-align: center;
      color: #fff;
      background-color: #E93B3B;
      border-radius: 50%;
      transform: scale(.5);
      transform-origin: center;
    }
    &-total {
      flex: 1;
      padding-left: .1rem;
      // vertical-align: -0.02rem;
      .cart-totalPrice {
        font-size: .18rem;
        font-weight: bold;
        color: #E93B3B;
      }
    }
    &-go {
      position: absolute;
      right: 0;
      width: .98rem;
      text-align: center;
      background-color: #4FB0F9;;
      color: #fff !important;
    }
  }
</style>
