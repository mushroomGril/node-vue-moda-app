//接口请求
import axios from "axios";
//创建一个实例
const http = axios.create({
    baseURL:"http://localhost:3000/admin/api"
});

export default http;