const { Router } = require('express')
const { image, createArticle, getArticleById, getArticle } = require('../../controller/article')
const {articleCache, searchCache} = require('../../middleware/cache')
const auth = require('../../middleware/auth')
const router = Router()

// 上传图片 返回图片 url
router.post('/image', image)

// 创建文章
router.post('/create', auth, createArticle)

// 根据文章 id 获取文章
router.get('/getbyid/:id', articleCache, getArticleById)

// 根据作者 tag 获取文章
router.get('/getarticle', searchCache, getArticle)

module.exports = router