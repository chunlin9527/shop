import { computed } from 'vue'
import { useStore } from 'vuex'

// 购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList

  // 单个店铺购物车逻辑
  const changeCartItem = (shopId, productId, productInfo, count) => {
    // console.log(cartList.value[shopId])
    // console.log(shopId, productId, productInfo)
    store.commit('changeCartItem', {
      shopId, productId, productInfo, count
    })
  }

  // 计算提交订单的产品
  const productList = computed(() => {
    const cartProductList = cartList[shopId] || {}
    const result = []
    const keys = Object.keys(cartProductList)
    for (const k of keys) {
      if (cartProductList[k].count > 0 && cartProductList[k].isChecked) {
        result.push(cartProductList[k])
      }
    }
    // console.log(result)
    return result
  })

  // 计算提交订单的价格
  const calculations = computed(() => {
    const productList = cartList[shopId]
    const result = { total: 0, price: 0, allChecked: true }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.isChecked) {
          result.price += (product.count * product.price)
        }
        if (product.count > 0 && !product.isChecked) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })

  return { cartList, productList, calculations, changeCartItem }
}
