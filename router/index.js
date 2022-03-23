const { Router } = require('express')

const router = Router()

// 用户路由
router.use(require('./user')) 

module.exports = router