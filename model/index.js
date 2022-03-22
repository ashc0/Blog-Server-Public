const mongoose = require('mongoose')
const { dbUri } = require('../config/db')

mongoose.connect(dbUri).then(() => {
  console.log('数据库连接成功')
}).catch(console.log)