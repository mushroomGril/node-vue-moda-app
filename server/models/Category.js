const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: { type: String },
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}//表示数据库的ObjectId,ref表示关联的是哪一个模型
})
// schema.virtual('children',{
//     localField:'_id',
//     foreignField :'parent',
//     justOne:false,
//     ref:'Category'
// })
// schema.virtual('newsList',{
//     localField:'_id',
//     foreignField:'categories',
//     justOne:false,
//     ref:'Article'
// })


module.exports = mongoose.model('Category',schema)