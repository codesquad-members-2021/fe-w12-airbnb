const express = require('express');
const app = express();

const SERVER_PORT = 3000;

const server = app.listen(SERVER_PORT);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});