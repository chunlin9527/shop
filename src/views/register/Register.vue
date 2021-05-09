<template>
  <div class="wrapper">
    <img class="wrapper-img" src="../../assets/img/login/编组@2x.png" alt="">
    <div class="wrapper-input">
      <input
        class="wrapper-input-content"
        type="text"
        placeholder="请输入手机号"
        v-model="mobile"
      >
    </div>
    <div class="wrapper-input">
      <input
        class="wrapper-input-content"
        type="password"
        placeholder="请输入密码"
        v-model="password"
        autocomplete="new-password"
      >
    </div>
    <div class="wrapper-input">
      <input
        class="wrapper-input-content"
        type="password"
        placeholder="确认密码"
        v-model="ensurement"
      >
    </div>
    <button class="wrapper-register" @click="handleRegister">注册</button>
    <p class="wrapper-regist" @click="handleLogin">已有账号去登陆</p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'

const useRegisterEffect = () => {
  const router = useRouter()
  const data = reactive({
    mobile: '',
    password: '',
    ensurement: ''
  })
  const { mobile, password, ensurement } = toRefs(data)

  // 1-->使用封装的post异步请求
  const handleRegister = async () => {
    const res = await post('/user/register', {
      mobile: data.mobile,
      password: data.password
    })
    if (res.data.mobile === 'abc') {
      router.push('/login')
    }
  }
  return { mobile, password, ensurement, handleRegister }
}

export default {
  name: 'Register',
  setup () {
    const router = useRouter()
    const { mobile, password, ensurement, handleRegister } = useRegisterEffect()

    const handleLogin = () => {
      router.replace('/login')
    }
    return {
      mobile,
      password,
      ensurement,
      handleRegister,
      handleLogin
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    transform: translateY(-50%);
    text-align: center;
    padding: 0 .4rem;
    &-img {
      display: block;
      width: .66rem;
      height: .66rem;
      margin: 0 auto .4rem auto;
    }
    &-input {
      margin-top: .16rem;
      background: #F9F9F9;
      border: .01rem solid rgba(0,0,0,0.10);
      border-radius: .06rem;
      height: .48rem;
      &-content {
        box-sizing: border-box;
        width: 100%;
        line-height: .48rem;
        border: none;
        outline: none;
        padding: 0 .16rem;
        font-size: .16rem;
        color: #777;
        // &::placeholder {
        //   color: #777
        // }
      }
    }
    &-register {
      width: 100%;
      height: .48rem;
      background: #0091FF;
      box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
      border-radius: .04rem;
      color: #fff;
      border: none;
      outline: none;
      font-size: .16rem;
      margin: .16rem 0;
    }
    &-regist {
      font-size: .14rem;
      color: #777;
    }
  }
</style>
