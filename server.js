const express = require("express");
const app = express();
const faker = require("faker");

const server = app.listen(8000, () =>
  console.log("The server is all fired up on port 8000")
);
const io = require("socket.io")(server);

const users = {};
const messages = [];

io.on("connection", socket => {
  socket.emit("Welcome", "Sup");
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
    socket.broadcast.emit("new_message_from_server", receivedMessage);
  });
  socket.on("disconnect", () => {
    if (socket.id in users) delete users[socket.id];
  });
});
