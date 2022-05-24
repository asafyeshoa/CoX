const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const allUsers = {}

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

server.listen(3000, () => {
  console.log("serverA is running");
  console.log("server running on 3000");
});

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);
  allUsers[socket.id] = socket;

  app.get('/spin', (req, res) => {
    const idArray = Object.keys(allUsers)
    const user = idArray[Math.floor(Math.random()*idArray.length)];
    console.log(user)
    socket.broadcast.to(user).emit('message', 'you got spin!!');
    res.send('spin sent')
  })

  app.get('/blast', (req, res) => {
    socket.broadcast.emit("message", "blast to all users");
    res.send('blast sent')
  })

  app.get('/wild', (req, res) => {
    const idArray = Object.keys(allUsers)
    const randomNumber = 2
    const shuffled = [...idArray].sort(() => 0.5 - Math.random());
    const users = shuffled.slice(0, randomNumber);

    users.forEach(user => {
      socket.broadcast.to(user).emit('message', 'you got wild!!');

    })
    res.send('wild sent')

  })

  socket.emit('message', 'server is running')

});

