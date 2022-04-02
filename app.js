const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

require('./model')

const PORT = 3000

app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
//路由
app.use('/api', require('./router'))

// 错误处理
app.use(require('./middleware/errorHandler'))

app.get('/', (req, res) => {
  res.header({
    contentType: 'text/html'
  }).end('<h1 style="text-align:center;color:red">Hello</h1>')
})
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})