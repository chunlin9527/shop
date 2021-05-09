<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__info">
        <div class="header__info__user">{{userInfo.username}}</div>
        <div class="header__info__id">ID:{{userInfo._id}}</div>

        <div class="header__info__tab">
          <div>
            <p>红包</p>
            <span>218</span>
          </div>
          <div>
            <p>优惠券</p>
            <span>12张</span>
          </div>
          <div>
            <p>淘金币</p>
            <span>88</span>
          </div>
          <div>
            <p>白条</p>
            <span>1000</span>
          </div>
        </div>
      </div>
      <img
        class="header__avatar"
        src="https://i.loli.net/2021/04/26/lZDdWpbUEJhqRum.jpg"
      />
    </div>

    <div class="personInfo">
      <div class="personInfo__item">
        <img class="personInfo__item__img" src="https://i.loli.net/2021/04/26/peRrAYy29nTFLP8.png" alt="">
        <span class="personInfo__item__money">我的钱包</span>
      </div>
      <div class="personInfo__item">
        <img class="personInfo__item__img" src="https://i.loli.net/2021/04/26/NsSVf3BiIEpobG4.png" alt="">
        <span class="personInfo__item__address">我的地址</span>
      </div>
      <div class="personInfo__item">
        <img class="personInfo__item__img" src="https://i.loli.net/2021/04/26/Yif6QGz1VpJF9tj.png" alt="">
        <span class="personInfo__item__help">客服与帮助</span>
      </div>
    </div>

    <div class="logout" @click="handleLogout">退出登陆</div>
  </div>
  <Docker />
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'
import Docker from '../../components/Docker'

// 获取个人信息
const useUserEffect = () => {
  const userInfo = reactive({ _id: '', username: '' })
  const getUserInfo = async () => {
    const result = await get('/user/info')
    if (result?.errno === 0 && result?.data) {
      const { _id, username } = result.data
      userInfo._id = _id || ''
      userInfo.username = username || ''
    }
  }
  getUserInfo()
  return userInfo
}

export default {
  name: 'Profile',
  components: { Docker },
  setup () {
    const router = useRouter()
    const handleLogout = () => {
      localStorage.removeItem('isLogin')
      router.replace({ name: 'Login' })
    }
    const userInfo = useUserEffect()
    return { handleLogout, userInfo }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: .5rem;
    right: 0;
    background: #fff;
  }
  .header {
    position: relative;
    height: 1.5rem;
    background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
    padding-top: .4rem;
    &__info {
      margin: .3rem .18rem 0 .18rem;
      padding-top: .46rem;
      // height: .66rem;
      background: #fff;
      border-radius: .08rem;
      &__user {
        font-size: .24rem;
        color: #262628;
        text-align: center;
        line-height: .36rem;
      }
      &__id {
        margin-top: .04rem;
        font-size: .14rem;
        color: #C1C0C9;
        text-align: center;
      }
      &__tab {
        display: flex;
        justify-content: space-around;
        div {
          width: .5rem;
          height: .5rem;
          text-align: center;
          p {
            color: #C1C0C9;
            margin: .07rem 0;
          }
          span {
            font-size: .18rem;
            color: #262628;
          }
        }
      }
    }
    &__avatar {
      position: absolute;
      left: 50%;
      top: .2rem;
      transform: translateX(-50%);
      width: .94rem;
      height: .94rem;
      border-radius: 50%;
    }
  }
  .personInfo {
    margin: .7rem .18rem .3rem .18rem;
    &__item {
      height: .5rem;
      line-height: .5rem;
      font-size: .14rem;
      color: #262626;
      &__img {
        width: .22rem;
        height: .22rem;
        margin: .14rem .16rem;
        vertical-align: -.2rem;
      }
    }
  }
  .logout {
    margin: 0 .18rem;
    line-height: .38rem;
    background: #0091FF;
    color: #fff;
    font-size: .14rem;
    text-align: center;
    border-radius: .04rem;
  }
</style>
