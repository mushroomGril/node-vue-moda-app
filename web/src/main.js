import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import Swiper2, {Navigation, Pagination,Autoplay} from 'swiper';
Swiper2.use([Navigation, Pagination,Autoplay]);
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

import './assets/iconfont/iconfont.css'
import axios from 'axios'
Vue.prototype.$axios = axios.create({
  baseURL: process.env.VUE_APP_API_RUL || '/web/api'
  // baseURL:'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
