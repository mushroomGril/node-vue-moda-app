//自动获取模型中间件
module.exports = options => {
    return async (req, res, next) => {
        //inflection专门处理单词单复数转换
        const modelName = require('inflection').classify(req.params.resource)//转成模型名称
        req.Model = require(`../models/${modelName}`)
        next()
    }
}