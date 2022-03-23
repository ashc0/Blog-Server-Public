const mongoose = require('mongoose')

const { dbUri } = require('../config/private')

mongoose.connect(dbUri).then(() => {
  console.log('数据库连接成功')
}).catch(console.log)

module.exports = {
  User: mongoose.model('User', require('./user')),
  Blog: mongoose.model('Blog', require('./blog'))
}