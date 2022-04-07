const { uploadImage } = require('../storage/cos')

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