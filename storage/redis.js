const redis = require("redis");
const { promisify } = require('util')
/**以下参数分别填写您的 Redis 实例内网 IP、端口号、实例 ID 和密码*/
var instanceid = "crs-hply4tzd",
    pwd = "lovelu1314",
    host = "sh-crs-hply4tzd.sql.tencentcdb.com",
    port = "27452";
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


/**接下来可以开始操作 Redis 实例 */
//设置 Key
// client.set("redis", "tencent", function(err, reply){
//     if (err) {
//         console.log(err);
//             return;
//     }
//     console.log("set key redis " + reply.toString() + ", value is tencent");
// });
// //获取 Key
// client.del('redis', (err, res) => {console.log(res)})
// client.get("redis", function (err, reply) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     if(reply === null) {console.log(1)}
//     else console.log("get key redis is:" + reply.toString());
// //程序结束关闭客户端
//     client.end();
// });
// client.exists("redis", (err, res) => {
//     if(err) throw 1
//     if(res) console.log('存在')
//     else console.log('不存在')
// })


module.exports = client