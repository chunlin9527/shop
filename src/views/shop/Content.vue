<template>
  <div class="content">
    <ul class="category">
      <li
        :class="{'category-list': true, 'category-active': data.current === list.tab }"
        v-for="(list, idx) in categoryList"
        :key="idx"
        @click="() => handleCategoryClick(list.tab)"
      >
        {{list.name}}
      </li>
    </ul>

    <div class="product">
      <div class="product-item"
        v-for="item in productList"
        :key="item.id"
      >
        <img class="product-item-img" :src="item.imgUrl" alt="">
        <div class="product-item-detail">
          <h4 class="product-item-name">{{item.name}}</h4>
          <p class="product-item-sale">月售{{item.sale}}件</p>
          <span class="product-item-yen">&yen;</span>
          <span class="product-item-price">{{item.price}}</span>
          <span class="product-item-oldPrice">&yen;{{item.oldPrice}}</span>

          <div class="product-number">
            <span class="number-item number-minus iconfont" @click="() => changeCartItem(shopId, item.id, item, -1)">&#xe608;</span>
            <span class="number-item number-count">
              {{cartList?.[shopId]?.[item.id]?.count || 0}}
            </span>
            <span class="number-item number-plus iconfont" @click="() => changeCartItem(shopId, item.id, item, 1)">&#xe63b;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { get } from '../../utils/request'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 1-->店铺产品内容逻辑
const useContentEffect = (shopId) => {
  const categoryList = ref()
  const productList = ref()
  const data = reactive({
    current: 'all'
  })
  // 店铺左边小分类
  const getCategoryList = async () => {
    const res = await get('/shop/category')
    categoryList.value = res.data
  }
  // 店铺产品
  const getProductList = async (tab) => {
    const res = await get(`/shop/${shopId}/products`, { tab })
    productList.value = res.data
  }
  // 每次点击小分类-->请求产品数据
  const handleCategoryClick = (tab) => {
    data.current = tab
    getProductList(tab)
  }
  return { data, categoryList, productList, getCategoryList, getProductList, handleCategoryClick }
}

export default {
  name: 'Content',
  setup () {
    const route = useRoute()
    const shopId = route.params.id

    const { data, categoryList, productList, getCategoryList, getProductList, handleCategoryClick } = useContentEffect(shopId)
    getCategoryList()
    getProductList()
    // console.log(categoryList, productList)

    const { cartList, changeCartItem } = useCommonCartEffect(shopId)
    return {
      data,
      categoryList,
      productList,
      handleCategoryClick,
      cartList,
      shopId,
      changeCartItem
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    position: absolute;
    top: 1.74rem;
    bottom: .5rem;
    left: 0;
    right: 0;
  }
  // 分类样式
  .category {
    list-style: none;
    width: .76rem;
    height: 100%;
    background-color: #F5F5F5;
    overflow-y: scroll;
    &-list {
      height: .4rem;
      font-size: .14rem;
      color: #333333;
      line-height: .4rem;
      text-align: center;
    }
    &-active {
      background-color: #fff;
    }
  }
  // 产品样式
  .product {
    overflow-y: scroll;
    flex: 1;
    height: 100%;
    padding: 0 .18rem 0 .16rem;
    &-item {
      display: flex;
      padding-bottom: .12rem;
      border-bottom: .01rem solid #F1F1F1;
      &:not(:first-child) {
        padding-top: .12rem;
      }
      &-detail {
        position: relative;
        flex: 1;
      }
      &-img {
        width: .68rem;
        height: .68rem;
        margin-right: .16rem;
      }
      &-name {
        font-size: .14rem;
        color: #333333;
        line-height: .2rem;
      }
      &-sale {
        font-size: .12rem;
        color: #333333;
        margin: .06rem 0;
      }
      &-yen {
        display: inline-block;
        font-size: .2rem;
        transform: scale(.5);
        transform-origin: center;
        color: #E93B3B;
        font-weight: bold;
      }
      &-price {
        position: absolute;
        bottom: .06rem;
        font-size: .14rem;
        color: #E93B3B;
        font-weight: bold;
        line-height: .14rem;
        vertical-align: middle;
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
  // 添加购物车按钮样式
  .product-number {
    position: absolute;
    right: 0;
    bottom: .02rem;
    color: #333;
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
</style>
