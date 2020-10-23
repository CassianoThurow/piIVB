const express = require('express')
const app = express()
const clients = require('./clients.json');


app.get('/', function (req, res) {
  res.json(clients)
})

app.listen(3000)