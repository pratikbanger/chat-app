const express = require('express');
const path = require('path');
const PORT = 5000;

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname + "/public")));

io.on("connection", function(socket) {

    socket.on("newuser", function(usename) {
        socket.broadcast.emit("update", usename + " joined the conversation.");
    });

    socket.on("exituser", function(usename) {
        socket.broadcast.emit("update", usename + " left the group chat!");
    });

    socket.on("chat", function(message) {
        socket.broadcast.emit("chat", message);
    });
});

server.listen(PORT);