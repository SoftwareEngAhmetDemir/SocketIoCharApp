import { Socket } from "dgram";
import express from "express";
import path from "path";
const app = express();
const port = 3000;
const server = require("http").createServer(app);

const io = require("socket.io")(server);

const user = {};

io.on("connection", (socket) => {
  socket.on("username", (name) => {
    user[socket.id] = name;
    socket.emit("newuser", user[socket.id]);
  });

  socket.on("send-message", (message) => {
   
    socket.broadcast.emit("chat-message", message);
   
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

server.listen(3000);
