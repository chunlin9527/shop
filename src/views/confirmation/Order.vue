<template>
  <div class="order">
    <div class="order__price">实付金额 <b>¥{{calculations.price}}</b></div>
    <div
      class="order__btn"
      @click="hanldleMaskShow"
    >提交订单</div>
  </div>
  <div class="mask" v-show="flag">
    <div class="mask__content">
      <h3 class="mask__content__title">确认提交订单？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则订单将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="handleCancelOrder"
        >取消提交</div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="handleConfirmOrder"
        >确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
import { useStore } from 'vuex'
export default {
  name: 'Order',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const shopId = route.params.id
    const store = useStore()
    const flag = ref(false)
    const { calculations } = useCommonCartEffect(shopId)

    // 遮罩显示状态
    const hanldleMaskShow = () => {
      flag.value = true
    }

    // 取消提交
    const handleCancelOrder = () => {
      flag.value = false
    }

    // 确认支付后跳转
    const handleConfirmOrder = () => {
      store.commit('handleOrderList', { shopId })
      flag.value = false
      router.replace('/orderList')
    }

    return { flag, hanldleMaskShow, calculations, handleCancelOrder, handleConfirmOrder }
  }
}
</script>

<style lang="scss" scoped>
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: #fff;
  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: #333;
  }
  &__btn {
    width: .98rem;
    background: #4FB0F9;
    color: #fff;
    text-align: center;
    font-size: .14rem;
  }
}
.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,0.50);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: #FFF;
    text-align: center;
    border-radius: .04rem;
    &__title {
      margin: .24rem 0 0 0;
      line-height: .26rem;
      font-size: .18rem;
      color: #333;
    }
    &__desc {
      margin: .08rem 0 0 0;
      font-size: .14rem;
      color: #666666;
    }
    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }
    &__btn {
      flex: 1;
      width: .8rem;
      height: .32rem;
      line-height: .32rem;
      border-radius: .16rem;
      font-size: .14rem;
      &--first {
        margin-right: .12rem;
        border: .01rem solid #4FB0F9;
        color: #4FB0F9;
      }
      &--last {
        margin-left: .12rem;
        background: #4FB0F9;
        color: #fff;
      }
    }
  }
}
</style>
