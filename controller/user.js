const { User } = require('../model')
const { sign, verify } = require('../utils/jwt')
const { jwtSecret } = require('../config/private')
const md5 = require('../utils/md5')
exports.loginHandler = async (req, res, next) => {
  try {
    const token = await sign({
      userId: req.user._id,
      // 防止修改密码后 token 依旧生效
      updatedAt: req.user.updatedAt
    }, jwtSecret)
    res.status(200).json({ ...req.user, token })
  } catch (err) {
    next(err)
  }
}

exports.registerHandler = async (req, res, next) => {
  try {
    let user = new User(req.body.user)
    await user.save()
    user = user.toJSON()
    delete user.password
    res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
}

exports.updateUserHandler = async (req, res, next) => {
  try {

    let user = req.user
    // 这里不用 md5 加密，因为会自动加密
    user.password = req.body.password.new
    user.updatedAt = new Date().getTime()
    await user.save()
    user = user.toJSON()
    delete user.password
    delete user._id
    res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
}