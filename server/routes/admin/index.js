module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')
    //添加分类
    router.post('/categories',async (req,res) => {
      const model = await Category.create(req.body)
      res.send(model);//发送回客户端请求完成
    })
    //分类列表
    router.get('/categories',async (req,res) => {
        const items = await Category.find().limit(10)
        res.send(items);//发送回客户端请求完成
      })

    app.use('/admin/api',router);
}