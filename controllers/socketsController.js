
function messageAllUsers(socket) {
    socket.broadcast.emit("message", "blast to all users");
}

function messageToRandomUser(socket, allUsers) {
    const idArray = Object.keys(allUsers)
    const user = idArray[Math.floor(Math.random()*idArray.length)];
    socket.broadcast.to(user).emit('message', 'you got spin!!');
}


function messageToRandomUsers(socket, allUsers, randomNumber) {
    const idArray = Object.keys(allUsers)
    const shuffled = [...idArray].sort(() => 0.5 - Math.random());
    const users = shuffled.slice(0, randomNumber);

    users.forEach(user => {
        socket.broadcast.to(user).emit('message', 'you got wild!!');

    })
}

module.exports = {
    messageAllUsers, messageToRandomUsers, messageToRandomUser
}
