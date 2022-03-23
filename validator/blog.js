const { body } = require('express-validator')
const validate = require('../middleware/validate')


exports.updateBlog = validate([
  body('blog.title').notEmpty().withMessage('标题不能为空'),
  body('blog.description').notEmpty().withMessage('描述不能为空')
])