const express = require("express");
const server = express();

//Middleware: 모든요청이 use를 거쳐야한다.
server.use(express.static(__dirname + "/public"))

server.get("/", (req, res) => {
   res.sendFile(__dirname + "/airBnb.html");
});

server.listen(3000, (err) => {
   if (err) return console.error("err");
   console.log("the server is listening on port 3000");
});