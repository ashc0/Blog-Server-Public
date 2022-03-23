module.exports = async (req, res, next) => {
  // console.log(req.user)
  if(req.user.role === 'admin') return next()
  res.status(403).json({error: {
    msg: '权限不足，请联系管理员'
  }})
}