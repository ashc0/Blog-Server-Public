const { Router } = require('express')

const router = Router()

// 用户路由
router.use(require('./user')) 
router.use('/blog', require('./blog'))
router.use('/article', require('./article'))

module.exports = router