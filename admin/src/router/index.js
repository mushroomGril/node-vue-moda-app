import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../views/Main.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/categories/create',
        component: () => import("../views/CategoryEdit.vue")
      },
      {
        path: '/categories/list',
        component: () => import("../views/CategoryList.vue")
      },
      {
        path: '/categories/edit/:id',
        component: () => import("../views/CategoryEdit.vue"),
        props:true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
