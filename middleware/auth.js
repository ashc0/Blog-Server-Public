const { verify } = require('../utils/jwt')
const { jwtSecret } = require('../config/private')
const { User } = require('../model')
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({
    error: {
      msg: '尚未登录'
    }
  })
  const token = req.headers.authorization.split('Bearer ')[1]
  // conosle.log(token)
  try {
    const { userId, updatedAt } = await verify(token, jwtSecret)
    const user = await User.findById(userId).select(['username', 'role', '_id', 'updatedAt'])
    console.log(updatedAt , user.updatedAt)
    if (!user || updatedAt !== user.updatedAt) return res.status(401).json({
      error: {
        msg: '尚未登录'
      }
    })
    req.user = user
    next()
  } catch (err) {
    next(err)
  }

}