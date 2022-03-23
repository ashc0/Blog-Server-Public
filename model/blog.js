const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    default: '豆子坑',
    required: true
  },
  description: {
    type: String,
    default: '但愿人长久'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = blogSchema