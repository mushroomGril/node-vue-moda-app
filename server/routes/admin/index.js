
const jwt = require('jsonwebtoken')
const assert = require('http-assert')
const AdminUser = require('../../models/AdminUser')
//把后台的接口写成通用的接口
module.exports = app => {

    const express = require('express')
    const router = express.Router({
        mergeParams: true//表示合并参数，没有否则req.params.resource用不了
    })

    //创建资源
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model);//发送回客户端请求完成
    })

    //修改
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model);
    })

    // 删除
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({ success: true });
    })

    //列表
    router.get('/', async (req, res) => {
        let queryOptions = {}
        //有些模型不需要管理模型，要做一些判断，满足扩展性，通用性
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items);
    })

    //通过ID找到列表所有内容（资源详情）
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model);
    })
    //登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    //自动获取模型的中间件
    const resourceMiddleware = require('../../middleware/resource')
    /**
     * arg1 设定路由
     * arg2 中间件 判断用户是否存在 
     * arg3 对应的模型（自动获取模型的中间件）
     * arg4 挂载路由
     */
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router);

    const multer = require('multer')//处理图片上传数据
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    //登录
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        //根据用户名找用户       
        //加selec方法是因为数据库模型设置了select="false"是取不到数据的
        const user = await AdminUser.findOne({ username }).select('+password')
        assert(user, 422, '用户不存在')
        // if (!user) {
        //     return res.status(422).send({ message: '用户不存在' })
        // }
        //校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        //返回token
        const token = jwt.sign({ _id: user._id }, app.get('secret'))
        res.send({ token })
    })

    //错误处理
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}