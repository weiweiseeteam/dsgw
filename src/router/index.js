import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/jdHome'
import Login from '../views/login/login'
import Register from '../views/register/register'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "Shop" */ '../views/shop/Shop')
  },
  {
    path: '/orderCreate/:id',
    name: 'orderCreate',
    component: () => import(/* webpackChunkName: "orderCreate" */ '../views/shop/OrderCreate')
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList')
  },
  {
    path: '/myInfo',
    name: 'myInfo',
    component: () => import(/* webpackChunkName: "myInfo" */ '../views/myInfo/myInfo')
  },
  {
    path: '/cartList',
    name: 'cartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/cartList')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.isLogin) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Register,
    beforeEnter: (to, from, next) => {
      if (localStorage.isLogin) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  }, {
    path: '/chooseAddressList/:shopId',
    name: 'ChooseAddressList',
    component: () => import(/* webpackChunkName: "chooseAddressList" */ '../views/chooseAddressList/ChooseAddressList')
  }, {
    path: '/myAddressList',
    name: 'MyAddressList',
    component: () => import(/* webpackChunkName: "myAddressList" */ '../views/myAddressList/MyAddressList')
  }, {
    path: '/upsertAddress/:id?',
    name: 'UpsertAddress',
    component: () => import(/* webpackChunkName: "upsertAddress" */ '../views/upsertAddress/UpsertAddress')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫验证登录
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin
  if (isLogin || to.name === 'Login' || to.name === 'Register') {
    next()
  } else {
    next({ name: 'Login' })
  }
})

export default router
