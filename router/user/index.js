const { Router } = require('express')
const {
  userHandler,
  loginHandler,
  registerHandler,
  updateUserHandler
} = require('../../controller/user')
const auth = require('../../middleware/auth')
const validator = require('../../validator/user')
const router = Router()

router.get('/user', auth, userHandler)

router.post('/login', validator.login, loginHandler)

router.put('/register', validator.register, registerHandler)

router.put('/user/update', auth, validator.update, updateUserHandler)

module.exports = router
