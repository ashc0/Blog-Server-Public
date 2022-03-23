const { Router } = require('express');
const role = require('../../middleware/role')
const auth = require('../../middleware/auth')
const { getBlogHandler, updateBlogHandler } = require('../../controller/blog')
const validator = require('../../validator/blog')

const router = Router()

router.get('/', auth, role, getBlogHandler)
router.put('/', auth, role, validator.updateBlog, updateBlogHandler)
module.exports = router