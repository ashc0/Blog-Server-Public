const crypto = require('crypto');
const { md5secret } = require('../config/private')

module.exports = str => crypto
.createHash('md5')
.update(md5secret + str)
.digest('hex') // 转为十进制