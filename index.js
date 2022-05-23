const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const allUsers = {}



server.listen(3000, () => {
  console.log("serverA is running");
  console.log("server running on 3000");
});

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);
  allUsers[socket.id] = socket;

  app.get('/spin', (req, res) => {
    console.log('spin')
    const idArray = Object.keys(allUsers)
    const randomUserId = idArray[Math.floor(Math.random()*idArray.length)];
    console.log(randomUserId)

    socket.to(randomUserId).emit("random-player", 'from A to B');
  })

  app.get('/blast', (req, res) => {
    io.emit("blast", "blast to all users");
  })


});
