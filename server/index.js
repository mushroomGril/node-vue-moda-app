const express = require("express")
const app = express();
app.use(require('cors')())//跨域模块
app.use(express.json())//要使用req.body就要引用这个
require('./plugins/db')(app)//连接数据库
require ('./routes/admin')(app);//路由
app.listen(3000,()=>{
    console.log('http:localhost:3000');
})