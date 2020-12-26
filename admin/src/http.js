import Vue from 'vue'
//接口请求
import axios from "axios";
import router from './router/index'
//创建一个实例
const http = axios.create({
    baseURL:process.env.VUE_APP_API_URL || '/admin/api',
    // baseURL: "http://localhost:3000/admin/api"
});
//响应拦截
http.interceptors.response.use(res => {
    return res;
}, err => {
    if (err.response.data.message) {
        //发生错误都会进入这里（不是200，大于等于400的状态码）
        //服务端发生错误，有message的就弹出来
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }
    if(err.response.status === 401){
       router.push('/login')
    }
    return Promise.reject(err)
})
//请求拦截
http.interceptors.request.use(res => {
    if(localStorage.token){
         //请求头带上token
        res.headers.Authorization = 'Bearer ' + (localStorage.token || ' ')
    }   
    return res
}, err => {

    return Promise.reject(err)
})

export default http;