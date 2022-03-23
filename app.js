const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

require('./model')

const PORT = 3000

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
//路由
app.use(require('./router'))

// 错误处理
app.use(require('./middleware/errorHandler'))

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})