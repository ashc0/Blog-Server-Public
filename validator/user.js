const { body } = require('express-validator')
const { validate } = require('../middleware/validate')
const { User } = require('../model')

exports.register = validate([
  body('user.username').notEmpty().withMessage('用户名不能为空'),
  body('user.password').notEmpty().withMessage('密码不能为空'),
  body('user.username').custom(async username => {
    let user = await User.findOne({ username })
    if(user) throw '用户名已存在'
  })
])

exports.login = validate([
  body('user.username').notEmpty().withMessage('用户名不能为空'),
  body('user.password').notEmpty().withMessage('密码不能为空')
])