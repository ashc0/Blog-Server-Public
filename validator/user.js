const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { User } = require('../model')
const md5 = require('../utils/md5')
exports.register = validate([
  body('user.username').notEmpty().withMessage('用户名不能为空'),
  body('user.password').notEmpty().withMessage('密码不能为空'),
  body('user.username').custom(async username => {
    let user = await User.findOne({ username })
    if (user) throw '用户名已存在'
  })
])

exports.login = validate([
  body('user.username').notEmpty().withMessage('用户名不能为空'),
  body('user.password').notEmpty().withMessage('密码不能为空'),
  body('user.password').custom(async (password, { req }) => {
    let user = await User.findOne(req.body.user).select(['updatedAt'])
    if (!user || user.password !== md5(password)) throw '用户名或密码错误'
    req.user = user.toJSON()
  })
])

exports.update = validate([
  body('password.old').notEmpty().withMessage('新密码不能为空'),
  body('password.new').notEmpty().withMessage('旧密码不能为空'),
  body('password.old').custom(async (password, { req }) => {
    if (password === req.body.password.new) throw '新旧密码不能相同'
    const user = await User.findById(req.user._id).select(['password', 'username'])
    if (user.password !== md5(req.body.password.old)) throw '原密码错误'
  })
])