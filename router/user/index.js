const { Router } = require('express')
const {
  loginHandler,
  registerHandler,
  updateUserHandler
} = require('../../controller/user')
const auth = require('../../middleware/auth')
const validator = require('../../validator/user')
const router = Router()

router.post('/login', validator.login,loginHandler)

router.put('/register', validator.register, registerHandler)

router.put('/user/update', auth, updateUserHandler)

module.exports = router
