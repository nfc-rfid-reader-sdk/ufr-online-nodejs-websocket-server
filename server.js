var express = require('express')
var ws = require('./ws')

var app = express()

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/websocket_server.html');
})

app.listen(3000, function () {
  console.log('uFR Online Websocket server example - open http://localhost:3000 for real-time event preview')
})
