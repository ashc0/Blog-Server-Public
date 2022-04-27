const client = require('../storage/redis')

exports.articleCache = async (req, res, next) => {
  try {
    client.get(req.params.id, (err, data) => {
      if (data === null) return next()
      console.log('cache')
      res.status(200).header({
        contentType: 'application/json'
      }).send(data)
    })
  } catch (error) {
    next(error)
  }
}

exports.searchCache = async (req, res, next) => {
  try {
    if (req.query.first) {
      client.get('firstList', (err, data) => {
        if (data === null) return next()
        console.log('cache')
        res.status(200).header({
          contentType: 'application/json'
        }).send(data)
      })
    } else next()

  } catch (error) {
    next(error)
  }
}