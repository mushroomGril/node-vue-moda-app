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



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
