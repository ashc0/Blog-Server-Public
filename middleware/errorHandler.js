module.exports = (err, req, res, next) => {
  res.status(500).json({
    error: {
      msg: err.message
    }
  })
}