const { Blog } = require('../model')

exports.getBlogHandler = async (req, res, next) => {
  let blog = await Blog.findOne()
  if (!blog) {
    blog = new Blog()
    await blog.save()
  }
  res.status(200).json({ blog })
}

exports.updateBlogHandler = async (req, res, next) => {
  let blog = await Blog.findOne()
  Object.assign(blog, req.body.blog, {updatedAt: new Date().getTime()})
  await blog.save()
  res.status(200).json({ blog })
}