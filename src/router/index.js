import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
  path: '',
  redirect: '/home'
}, {
  path: '/home',
  name: 'Home',
  component: () => import('../views/home/Home')
}, {
  path: '/demo',
  name: 'Demo',
  component: () => import('../views/home/Demo')
}, {
  path: '/orderList',
  name: 'OrderList',
  component: () => import('../views/orderList/OrderList')
}, {
  path: '/cart',
  name: 'Cart',
  component: () => import('../views/cart/Cart')
}, {
  path: '/profile',
  name: 'Profile',
  component: () => import('../views/profile/Profile')
}, {
  path: '/shop/:id',
  name: 'Shop',
  component: () => import('../views/shop/Shop')
}, {
  path: '/login',
  name: 'Login',
  component: () => import('../views/login/Login'),

  // 跳转到登陆界面前检查是否已登陆
  beforeEnter (to, from, next) {
    const { isLogin } = localStorage
    isLogin ? next({ name: 'Home' }) : next()
  }
}, {
  path: '/register',
  name: 'Register',
  component: () => import('../views/register/Register')
}, {
  path: '/confirmation/:id',
  name: 'Confirmation',
  component: () => import('../views/confirmation/Confirmation')
}]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由页面跳转前检查登陆状态
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  isLogin || to.name === 'Login' || to.name === 'Register' ? next() : next({ name: 'Login' })
})
// 更改浏览器title
router.afterEach((to, from) => {
  document.title = to.name
})

export default router
