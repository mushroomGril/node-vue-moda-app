module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')
    router.post('/categories',async (req,res) => {
      const model = await Category.create(req.body)
      res.send(model);//发送回客户端请求完成
    })

    app.use('/admin/api',router);
}