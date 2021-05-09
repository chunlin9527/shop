<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div
        class="order"
        v-for="(item, index) in orderList"
        :key="index"
      >
        <div class="order__title">
          沃尔玛{{item.id}}
          <span class="order__status">已提交</span>
        </div>

        <div class="order__content">
          <div class="order__content__imgs">
            <img
              class="order__content__img"
              v-for="(innerItem, innerIndex)  in item.list"
              :key="innerIndex"
              :src="innerItem.imgUrl"
            />
          </div>
          <div class="order__content__info">
            <div class="order__content__position">
              <div class="order__content__price">¥{{item.totalPrice}}</div>
              <div class="order__content__count">共{{item.list.length}}件</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker />
</template>

<script>
import { useStore } from 'vuex'
import Docker from '../../components/Docker'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
  name: 'OrderList',
  components: {
    Docker
  },
  setup () {
    const store = useStore()
    const { productList } = useCommonCartEffect()
    // 从vuex中引入已下订单列表
    const orderList = store.state.orderList

    return {
      productList,
      orderList
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: .2rem;
    bottom: .5rem;
    right: 0;
    background: #f8f8f8;
  }
  .title {
    line-height: .44rem;
    background: #fff;
    font-size: .16rem;
    color: #333;
    text-align: center;
  }
  .order {
    margin: .16rem .18rem;
    padding: .16rem;
    background: #fff;
    &__title {
      margin-bottom: .16rem;
      line-height: .22rem;
      font-size: .16rem;
      color: #333;
    }
    &__status {
      float: right;
      font-size: .14rem;
      color: #999;
    }
    &__content {
      display: flex;
      &__imgs {
        flex: 1;
      }
      &__img {
        width: .4rem;
        height: .4rem;
        margin-right: .12rem;
      }
      &__info {
        position: relative;
        width: .7rem;
      }
      &__position {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
      &__price {
        margin-bottom: .04rem;
        line-height: .2rem;
        font-size: .14rem;
        color: #E93B3B;
        text-align: right;
      }
      &__count {
        line-height: .14rem;
        font-size: .12rem;
        color: #333;
        text-align: right;
      }
    }
  }
</style>
