const { query } = require('express')

module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true//表示合并参数，没有否则req.params.resource用不了
    })
    //添加分类
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model);//发送回客户端请求完成
    })
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model);
    })
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({ success: true });
    })
    //分类列表
    router.get('/', async (req, res) => {
        let queryOptions = {}
        //有些模型不需要管理模型，要做一些判断，满足扩展性，通用性
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items);
    })
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model);
    })
    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        //inflection专门处理单词单复数转换
        const modelName = require('inflection').classify(req.params.resource)//转成模型名称
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router);


    const multer = require('multer')//处理图片上传数据
    const upload = multer({ dest:__dirname + '/../../uploads'})
    console.log(upload)
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}