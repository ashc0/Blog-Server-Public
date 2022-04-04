const redis = require('redis');

const redisClient = redis.createClient({
  host: '10.0.0.10',
  port: '6379',
  password: 'lovelu1314',
})

redisClient.on('connect', () => {
  console.log('redis client connected')
})

redisClient.on('error', (e) => {
  console.log(e)
})