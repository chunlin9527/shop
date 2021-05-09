<template>
  <div class="toast">{{message}}</div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'Toast',
  props: {
    message: String
  }
}

export const useToastEffect = () => {
  const toastData = reactive({
    toastShow: false,
    toastMessage: ''
  })

  const changeToastMessage = (message) => {
    toastData.toastShow = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.toastShow = false
      toastData.toastMessage = ''
    }, 2000)
  }
  return { toastData, changeToastMessage }
}
</script>

<style lang="scss" scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #333;
    width: 2rem;
    height: .5rem;
    border-radius: .05rem;
    line-height: .5rem;
    font-size: .14rem;
    color: #fff;
  }
</style>
