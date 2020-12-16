import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../views/Main.vue"
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import("../views/Login.vue"), meta: { isPublic: true } },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      //分类
      { path: '/categories/create', component: () => import("../views/CategoryEdit.vue") },
      { path: '/categories/list', component: () => import("../views/CategoryList.vue") },
      { path: '/categories/edit/:id', component: () => import("../views/CategoryEdit.vue"), props: true },
      //物品
      { path: '/items/create', component: () => import("../views/ItemEdit.vue") },
      { path: '/items/list', component: () => import("../views/ItemList.vue") },
      { path: '/items/edit/:id', component: () => import("../views/ItemEdit.vue"), props: true },
      //英雄
      { path: '/heroes/create', component: () => import("../views/HeroEdit.vue") },
      { path: '/heroes/list', component: () => import("../views/HeroList.vue") },
      { path: '/heroes/edit/:id', component: () => import("../views/HeroEdit.vue"), props: true },
      //文章
      { path: '/articles/create', component: () => import("../views/ArticleEdit.vue") },
      { path: '/articles/list', component: () => import("../views/ArticleList.vue") },
      { path: '/articles/edit/:id', component: () => import("../views/ArticleEdit.vue"), props: true },
      //广告位
      { path: '/ads/create', component: () => import("../views/AdEdit.vue") },
      { path: '/ads/list', component: () => import("../views/AdList.vue") },
      { path: '/ads/edit/:id', component: () => import("../views/AdEdit.vue"), props: true },
      //管理员
      { path: '/admin_users/create', component: () => import("../views/AdminUserEdit.vue") },
      { path: '/admin_users/list', component: () => import("../views/AdminUserList.vue") },
      { path: '/admin_users/edit/:id', component: () => import("../views/AdminUserEdit.vue"), props: true }

    ]
  }
]
const router = new VueRouter({
  routes
})
//beforeEach每次进入路由之前做什么(路由守卫)
router.beforeEach((to, from, next) => {
  //如果没有ispublic则表示不是公开访问的页面，本地token不存在，跳转到登录页面
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next();//调用才会跳转到页面，没有表示没有任何操作
})

export default router
