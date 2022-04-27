const { uploadImage } = require('../storage/cos')
const { Article, User } = require('../model')
const client = require('../storage/redis')
exports.image = async (req, res, next) => {
  try {
    const { size, path, name } = req.files['wangeditor-uploaded-image']
    const filename = name.split('.')[0] + new Date().valueOf()
    let url = await uploadImage(filename, path, size)
    res.status(200).json({ errno: 0, data: { url } })
  } catch (err) {
    res.status(200).json({ errno: 1, message: err.message })
  }
}

exports.createArticle = async (req, res, next) => {
  try {
    // title description body tagList author
    const article = new Article(req.body.article)
    article.author = req.user._id
    article.populate('author')
    await article.save()
    // article.populate('author')
    client.del('firstList')
    res.status(201).json({ article })
  } catch (error) {
    next(error)
  }
}

exports.getArticleById = async (req, res, next) => {
  try {
    // console.log(req.params.id)
    const article = await Article.findById(req.params.id).populate('author')
    if (!article) return res.status(404).end()
    client.setex(req.params.id, 3600, JSON.stringify({ article }))
    res.status(201).json({ article })
  } catch (error) {
    next(error)
  }
}

exports.getArticle = async (req, res, next) => {
  try {
    // console.log(req.params.auth)
    const { username, tag, limit = Infinity, offset = 0 } = req.query
    const filter = {}
    if (username) {
      console.log(username)
      const user = await User.findOne({ username }).select(['_id'])
      if (!user) return res.status(404).json({
        error: {
          msg: '用户不存在'
        }
      })
      filter.author = user._id
    }
    if (tag) filter.tagList = tag
    const [articles, articleCount] = await Promise.all([Article
      .find(filter)
      .populate('author')
      .skip(Number(offset))
      .limit(Number(limit))
      .sort({
        updatedAt: -1 // -1 倒序 1 正序
      }).select(['title', '_id', 'description', 'author', 'cover', 'updatedAt', 'tagList']),
      Article.countDocuments()
    ])
    if (articles.length === 0) return res.status(200).json({
      data: { articles: [], articleCount }
    })
    // 首次搜索
    if (req.query.first) client.setex('firstList', 3600 * 24, JSON.stringify({ articles, articleCount }))
    res.status(201).json({ articles, articleCount })
  } catch (error) {
    next(error)
  }
}