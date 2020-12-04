import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false
import http from './http'
Vue.prototype.$http = http;//把http加载到vue的实例属性上（原型），可以在任何页面用this.$http访问请求接口

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
