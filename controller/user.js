const { User } = require('../model')
const { sign, verify } = require('../utils/jwt')
const { jwtSecret } = require('../config/private')
const md5 = require('../utils/md5')
exports.loginHandler = async (req, res, next) => {
  try {
    let user = await User.findOne(req.body.user).select(['password'])
    if (!user || user.password !== md5(req.body.user.password)) return res.status(400).json({
      error: {
        msg: '用户名或密码错误'
      }
    })
    req.user = user
    const token = await sign({
      userId: user._id
    }, jwtSecret)
    res.status(200).json({ ...user.toJSON(), token })
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
    const user = req.user
    res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
}