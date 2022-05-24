const express = require("express");
const app = express();
const server = require("http").createServer(app);
const {io} = require('socket.io-client')
const socket = io("http://localhost:3000");




server.listen(4000, () => {
    console.log("serverB is running");
    console.log("server running on 4000");
});

socket.on("connection")



socket.on('message', (data) => {
    console.log(data)
})
