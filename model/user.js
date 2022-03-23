const mongoose = require('mongoose')
const md5 = require('../utils/md5')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    set: value => md5(value),
    required: true,
    select: false // 查找时不会自动带上
  },
  role: {
    type: String,
    default: 'user',
    set() { return 'user' }
  }, 
  createdAt: {
    type: String,
    default: new Date().getTime()
  },
  updatedAt: {
    type: String,
    default: new Date().getTime()
  }
})

module.exports = userSchema