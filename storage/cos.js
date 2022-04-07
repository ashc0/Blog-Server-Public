// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
const fs = require('fs');
const { SecretId, SecretKey, Bucket, Region, Host } = require('../config/cos.config')

var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
  SecretId,
  SecretKey
});

exports.uploadImage = async (filename, path, size) => {
  const Key = 'image/' + filename
  await cos.putObject({
    Bucket,
    Region,
    Key,
    Body: fs.createReadStream(path),
    ContentLength: size
  })
  return Host+Key
}

