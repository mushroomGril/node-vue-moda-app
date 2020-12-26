const express = require("express")
const app = express();
app.use(require('cors')())//跨域模块
app.use(express.json())//要使用req.body就要引用这个
require('./plugins/db')(app)//连接数据库
require ('./routes/admin')(app);//路由
require ('./routes/web')(app);//路由
app.use('/admin',express.static(__dirname+'/admin'))//编译后端
app.use('/',express.static(__dirname+'/web'))//编译后端
app.use('/uploads',express.static(__dirname+'/uploads'))//托管静态文件
app.set('secret','12djdl23sdf234ldg')
app.listen(3000,()=>{
    console.log('http:localhost:3000');
})