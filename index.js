const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.static(__dirname + './fe-w12-airbnb'));
// app.use("/css", express.static(__dirname + "public/css"));
