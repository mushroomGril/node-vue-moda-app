import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',    
    component: Main,
    children:[
      {path:'/',name:'home',component: () => import("../views/Home.vue") },
      {path:'/articles/:id',name:'article',component: () => import("../views/Article.vue") ,props:true},
      // {path:'/',name:'home',component: () => import("../views/Home.vue") }
    ]
  },
  {path:'/heroes/:id',name:'hero',component: () => import("../views/Hero.vue"),props:true },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
