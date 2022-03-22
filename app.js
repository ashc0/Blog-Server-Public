const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PORT = 3000


app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.get('/',() => {
  console.log('/ get')
})

app.post('/',(req, res) => {
  console.log('/ post')
  res.status(200).json(req.body)
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})