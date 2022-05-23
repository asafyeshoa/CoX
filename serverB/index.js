const express = require("express");
const app = express();
const server = require("http").createServer(app);
const {io} = require('socket.io-client')
const socket = io("http://localhost:3000");


app.get('/wild', (req, res) => {})



server.listen(4000, () => {
    console.log("serverB is running");
    console.log("server running on 4000");
});

socket.on("connection")


socket.on('blast', (data) => {
    console.log('blast is reached')
    console.log(data)
})

socket.on('random-player', (data) => {
    console.log(data)
    console.log('picked as random player')
})
