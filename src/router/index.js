import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login'
import test from '@/views/test'
import test2 from '@/views/test2'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'home',
      keepAlive: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      keepAlive: true
    }
  }, {
    path: '/test',
    name: 'test',
    component: test,
    meta: {
      title: '测试',
      keepAlive: true
    }
  }, {
    path: '/test2',
    name: 'test2',
    component: test2,
    meta: {
      title: '测试2',
      keepAlive: true
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | szrs`
  const role = localStorage.getItem('userid')
  if (!role && to.path !== '/login') {
    next('/login')
  } else {
    // console.log("有token")
    next()
  }
})

export default router
