const { body, param } = require('express-validator')
const validate = require('../middleware/validate')
const { Article } = require('../model')

exports.create = validate([
  body('article.title').notEmpty().withMessage('标题不能为空'),
  body('article.description').notEmpty().withMessage('描述不能为空'),
  body('article.body').notEmpty().withMessage('内容不能为空')
])

exports.get = validate([
  param('id').isMongoId().withMessage('非法id')
])

exports.update = validate([
  body('article.title').notEmpty().withMessage('标题不能为空'),
  body('article.description').notEmpty().withMessage('描述不能为空'),
  body('article.body').notEmpty().withMessage('内容不能为空'),
  body('article._id').isMongoId().withMessage('非法id').bail().custom(async (id, { req }) => {
    let article = await Article.findById(id)
    if (!article) throw '无效文章'
    if (req.user._id.valueOf() !== article.author.valueOf()) throw '权限不足2'
    req.article = article
  })

])