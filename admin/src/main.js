import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './style.css'

Vue.config.productionTip = false
import http from './http'
Vue.prototype.$http = http;//把http加载到vue的实例属性上（原型），可以在任何页面用this.$http访问请求接口
//
Vue.mixin({
  computed:{
    //取出上传地址
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    //上传的请求头
    getAuthHeaders() {
      return {
         Authorization: `Bearer ${localStorage.token || ''}`        
      }
    }
  },
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
