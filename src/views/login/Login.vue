<template>
  <div class="wrapper">
    <img class="wrapper-img" src="../../assets/img/login/编组@2x.png" alt="">
    <div class="wrapper-input">
      <input
        class="wrapper-input-content"
        type="text" placeholder="请输入手机号"
        v-model="mobile"
      >
    </div>
    <div class="wrapper-input">
      <input
        class="wrapper-input-content"
        type="password" placeholder="请输入密码"
        v-model="password"
        autocomplete="new-password"
      >
    </div>
    <button class="wrapper-login" @click="handleLogin">登陆</button>
    <p class="wrapper-regist" @click="handleRegister">立即注册</p>
    <Toast
      v-if="toastData.toastShow"
      :message="toastData.toastMessage"/>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

const useLoginEffect = (changeToastMessage) => {
  const router = useRouter()
  const data = reactive({
    mobile: '13666666666',
    password: '123456'
  })
  const { mobile, password } = toRefs(data)

  // 1-->使用封装的post异步请求
  const handleLogin = async () => {
    try {
      const res = await post('/user/login', {
        mobile: data.mobile,
        password: data.password
      })
      if (res.data.code === '0000') {
        localStorage.isLogin = true
        router.replace('/home')
      } else {
        changeToastMessage('登陆失败。请重新登陆！')
      }
    } catch (error) {
      changeToastMessage('服务器请求失败！')
    }
  }
  return { mobile, password, handleLogin }

  // 2-->使用async + axios异步请求
  // const handleLogin = async () => {
  //   const res = await axios.post('https://www.fastmock.site/mock/b8974f4c2cd08b6e31ec779af3d8b51e/jd/userlogin', {
  //     mobile: data.mobile,
  //     password: data.password
  //   })
  //   if (res.data.code === '0000') {
  //     localStorage.isLogin = true
  //     router.replace({ name: 'Home' })
  //   }
  // }
}

export default {
  name: 'Login',
  components: {
    Toast
  },
  setup () {
    const router = useRouter()
    const { toastData, changeToastMessage } = useToastEffect()
    const { mobile, password, handleLogin } = useLoginEffect(changeToastMessage)

    const handleRegister = () => {
      router.replace('/register')
    }

    return {
      mobile,
      password,
      toastData,
      changeToastMessage,
      handleLogin,
      handleRegister
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
    &-login {
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
