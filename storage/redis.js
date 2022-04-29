const redis = require("redis");

/**以下参数分别填写您的 Redis 实例内网 IP、端口号、实例 ID 和密码*/
var instanceid = "...",
    pwd = "...",
    host = "...",
    port = "...";
    // host = "10.0.0.10",
    // port = 6379;

//连接 Redis
var client = redis.createClient(port, host, { detect_buffers: true });
client.on("connect", () => {
    console.log('redis 连接成功')
});

// Redis 连接错误
client.on("error", function (error) {
    console.log('error', error);
});
//鉴权
client.auth(instanceid + ":" + pwd);

module.exports = client