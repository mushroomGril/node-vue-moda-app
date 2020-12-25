//登录授权校验（中间件）
const jwt = require('jsonwebtoken')
const assert = require('http-assert')
const AdminUser = require('../models/AdminUser')
module.exports = options => {
    return async (req, res, next) => {
        //校验用户是否登录
        const token = String(req.headers.authorization || '').split(' ').pop();  
        // console.log(req.headers.authorization)      
        assert(token, 401, '请先登录1')
        const id = jwt.verify(token,req.app.get('secret'))//解密token，拿到ID 
        assert(id, 401, '请先登录2')
        //挂载到req上，表示请求的用户是谁
        //根据ID在数据库找到这个用户，赋值给req.user挂载上去
        req.user = await AdminUser.findById(id)
        //如果这个用户不存在
        assert(req.user, 401, '请先登录3')
        await next()
    }
}
