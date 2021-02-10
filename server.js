const express = require('express');

const app = express();
const port = 8080;
const path = require('path');

app.use(express.static('public'));
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/public'));
});

app.listen(port, function (err) {
  console.log('Connected port - ' + port);
  if (err) {
    return console.log('Found error - ', err);
  }
});
