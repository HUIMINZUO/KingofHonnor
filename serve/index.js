const express = require("express")

const app = express()

// 跨域模块
app.use(require('cors')())
app.use(express.json())
// 静态托管文件
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000');
});