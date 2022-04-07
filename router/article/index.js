const { Router } = require('express')
const { image } = require('../../controller/article')
const router = Router()

router.post('/image', image)


module.exports = router