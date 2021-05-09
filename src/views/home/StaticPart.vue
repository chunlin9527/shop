<template>
    <div class="top">
      <span class="iconfont top-icon-left">&#xe601;</span>
      <span class="top-text">仙林大学城科技园2号楼10层</span>
      <span class="iconfont top-icon-right">&#xf098;</span>
    </div>

    <div class="search">
      <span class="iconfont search-icon">&#xe602;</span>
      <input class="search-input" type="text" name="" id="" placeholder="山姆会员商店优惠商品">
    </div>

    <swiper
      :autoplay="swiperOptions.autoplay"
      :loop="swiperOptions.loop"
      :speed="swiperOptions.speed"
      :pagination="swiperOptions.pagination"
    >
      <swiper-slide>
        <img src="../../assets/img/home/banner.webp" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="../../assets/img/home/banner1.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="../../assets/img/home/banner2.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="../../assets/img/home/banner3.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="../../assets/img/home/banner4.jpg" alt="">
      </swiper-slide>
      <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
      <div class="swiper-pagination"></div>
    </swiper>

    <div class="icons">
      <router-link
        tag="div"
        class="icons-item"
        v-for="list in categoryList"
        :key="list.id"
        to="/demo"
      >
        <img class="icons-item-img" :src="list.imgUrl" alt="">
        <p class="icons-item-title">{{list.title}}</p>
      </router-link>
    </div>

    <div class="gap"></div>
</template>

<script>
import { reactive } from 'vue'
import { nanoid } from 'nanoid'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Autoplay, Pagination } from 'swiper' // 导入Swiper核心和所需模块
import 'swiper/swiper.scss' // 导入Swiper核心样式
import 'swiper/components/pagination/pagination.scss' // 导入Swiper分页器样式

SwiperCore.use([Autoplay, Pagination])
export default {
  name: 'StaticPart',
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    const swiperOptions = reactive({
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      loop: true,
      speed: 1000,
      pagination: {
        el: '.swiper-pagination',
        clickable: true // 点击小圆点切换
      }
    })
    const categoryList = [
      { id: nanoid(), imgUrl: 'https://i.loli.net/2021/04/20/cO9ApYRMw56e3Cq.png', title: '超市' },
      { id: nanoid(), imgUrl: 'https://i.loli.net/2021/04/20/NijcWX5DthVaYH9.png', title: '菜市场' },
      { id: nanoid(), imgUrl: 'https://i.loli.net/2021/04/20/ceDbo2K6QxWhfzy.png', title: '水果店' },
      { id: nanoid(), imgUrl: 'https://i.loli.net/2021/04/20/sop5uUlv9ncjWDy.png', title: '鲜花' },
      { id: nanoid(), imgUrl: 'https://i.loli.net/2021/04/20/LGl9CXvPDkjIpaR.png', title: '医药健康' },
      { id: nanoid(), imgUrl: 'https://i.loli.net/2021/04/20/FCr2dihwDpt4f9T.png', title: '家居' },
      { id: nanoid(), imgUrl: 'https://i.loli.net/2021/04/20/fN1dAFCbOZSEiPG.png', title: '蛋糕' },
      { id: nanoid(), imgUrl: 'https://i.loli.net/2021/04/20/y7zWqciBNOhdRYD.png', title: '签到' },
      { id: nanoid(), imgUrl: 'https://i.loli.net/2021/04/20/nVdzQ85kasp9w4W.png', title: '大牌免运' },
      { id: nanoid(), imgUrl: 'https://i.loli.net/2021/04/20/N5D7rFzvxtnZPjK.png', title: '红包' }
    ]

    // 将swiperOptions返回给模板中的swiper组件使用
    return {
      categoryList,
      swiperOptions
    }
  }
}
</script>

<style lang="scss" scoped>
    .top {
      position: relative;
      padding: .16rem .24rem;
      font-size: .16rem;
      color: #333;
      line-height: .22rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &-icon-left {
        position: absolute;
        left: 0;
      }
      &-icon-right {
        position: absolute;
        right: 0;
      }
    }
    .search {
      box-sizing: border-box;
      height: .32rem;
      color: #B7B7B7;
      background-color: #F5F5F5;
      border-radius: .16rem;
      padding: .08rem .16rem;
      &-input {
        overflow: hidden;
        height: .16rem;
        font-size: .14rem;
        line-height: .16rem;
        border: none;
        outline: none;
        color: #B7B7B7;
        background-color: #F5F5F5;
        padding: 0 .12rem;
      }
    }
    /* 解决抖动 */
    .swiper-container {
      margin: .16rem 0;
    }
    .swiper-wrapper {
      height: 0;
      overflow: hidden;
      padding-bottom: 30.7%;
      img {
        width: 100%;
      }
    }
    .icons {
      display: flex;
      flex-flow: row wrap;
      &-item {
        width: 20%;
        font-size: .12rem;
        color: #333333;
        text-align: center;
        &-title {
          margin: .06rem 0 .16rem 0;
        }
      }
    }
    .gap {
      margin: 0 -.18rem;
      height: .1rem;
      background: #F1F1F1;
    }
</style>
