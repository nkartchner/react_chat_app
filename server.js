const express = require("express");
const app = express();
const faker = require("faker");
// THIS IS NEW
// instead of just having app.listen here, we
// save the instance of our server in a variable
// called "server"
const server = app.listen(8000, () =>
  console.log("The server is all fired up on port 8000")
);

// we need to pass it an instance of our server to initialize
// a socket connection.
const io = require("socket.io")(server);
const users = {};
const messages = [];
io.on("connection", socket => {
  socket.emit("Welcome");
  socket.on("new_name", data => {
    if (!(socket.id in users))
      users[socket.id] = {
        name: data.name,
        _id: socket.id,
        avatar: faker.internet.avatar()
      };
    socket.emit("data", { users, messages });
    socket.broadcast.emit("new_user_connected", users);
  });
  socket.on("new_message", receivedMessage => {
    messages.push(receivedMessage);
    console.log("sending new message.....", receivedMessage);
    socket.broadcast.emit("new_message_from_server", receivedMessage);
  });
  socket.on("disconnect", () => {
    if (socket.id in users) delete users[socket.id];
  });
});
// io.on("connection", socket => {
//   // NOTE: Each client that connects gets their own socket id!
//   console.log(socket.id);
//   // if this is logged in our node terminal, that means a new client
//   // has successfully completed the handshake!

//   // We add all of our additional event listeners
//   // right inside this function.
//   // NOTE "connection" is a BUILT IN event listeners.
//   //
// });
