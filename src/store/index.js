import { createStore } from 'vuex'

// 设置localStorage.cartList
const setLocalStorage = (state) => {
  localStorage.cartList = JSON.stringify(state.cartList)
}
const getLocalStorage = () => {
  const cartList = localStorage.cartList || '{}'
  return JSON.parse(cartList)
}

export default createStore({
  state: {
    cartList: getLocalStorage(),
    orderList: JSON.parse(localStorage.orderList || '[]')
    // [
    //   { id: 1, list: [{}, {}, {}] }
    //   { id: 2, list: [{}, {}, {}] }
    //   { id: 3, list: [{}, {}, {}] }
    // ]
  },
  mutations: {
    changeCartItem (state, payload) {
      const { shopId, productId, productInfo, count } = payload
      // 店铺信息
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) {
        shopInfo = {}
      }
      // 购物车产品信息
      let product = shopInfo[productId]
      if (!product) {
        product = productInfo
        product.count = 0
        product.isChecked = true
      }
      // 数量加减
      if (count === 1) {
        product.count += 1
      }
      if (count === -1) {
        product.count -= 1
        // product.count = product.count < 0 ? 0 : product.count
        if (product.count < 0) {
          product.count = 0
          product.isChecked = false
        }
      }
      // console.log(product)
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalStorage(state)
    },

    // 单个商品勾选逻辑
    handleIconCheck (state, payload) {
      const { shopId, productId } = payload
      const shopInfo = state.cartList[shopId]
      shopInfo[productId].isChecked = !shopInfo[productId].isChecked
      setLocalStorage(state)
    },

    // 全选逻辑
    handleCheckAll (state, payload) {
      const { shopId, allChecked } = payload
      const shopInfo = state.cartList[shopId]
      const keys = Object.keys(shopInfo)
      if (allChecked) {
        for (const k of keys) {
          shopInfo[k].isChecked = false
        }
      } else {
        for (const k of keys) {
          shopInfo[k].isChecked = true
        }
      }
      setLocalStorage(state)
    },

    // 清空购物车逻辑
    clearCart (state, payload) {
      const { shopId } = payload
      const shopInfo = state.cartList[shopId]
      for (const k in shopInfo) {
        shopInfo[k].count = 0
      }
      setLocalStorage(state)
    },

    // 生成订单列表
    handleOrderList (state, payload) {
      const { shopId } = payload
      // 计算提交订单的产品
      const cartProductList = state.cartList[shopId]
      const result = {}
      result.id = shopId
      result.list = []
      let price = 0
      const keys = Object.keys(cartProductList)
      for (const k of keys) {
        if (cartProductList[k].count > 0 && cartProductList[k].isChecked) {
          result.list.push(cartProductList[k])
          price += (cartProductList[k].count * cartProductList[k].price)
          // 下单后清空购物车
          cartProductList[k].count = 0
        }
      }
      result.totalPrice = price.toFixed(2)
      state.orderList.push(result)
      // console.log(state.orderList)
      localStorage.orderList = JSON.stringify(state.orderList)
    }
  },
  actions: {
  },
  modules: {
  }
})
