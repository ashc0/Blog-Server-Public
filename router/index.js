const { Router } = require('express')

const router = Router()

// 用户路由
router.use(require('./user')) 
router.use('/blog', require('./blog'))

module.exports = router