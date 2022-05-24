const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const {messageToRandomUsers, messageAllUsers, messageToRandomUser} = require('./controllers/socketsController')
const allUsers = {}


// the route created for debugging and testing ONLY!

// app.set("view engine", "ejs");
// app.get("/", (req, res) => {
//   res.render("home");
// });


server.listen(3000, () => {
  console.log("serverA is running");
  console.log("server running on 3000");
});

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);
  allUsers[socket.id] = socket;

  app.get('/spin', (req, res) => {
    messageToRandomUser(socket, allUsers)
    res.send('Spin sent')
  })

  app.get('/blast', (req, res) => {
    messageAllUsers(socket)
    res.send('Blast sent')
  })

  app.get('/wild/:usersNumber', (req, res) => {
    const randomNumber = req.params.usersNumber
    messageToRandomUsers(socket, allUsers, randomNumber)
    res.send('Wild sent')
  })

  socket.emit('message', 'socket is connected')

});

