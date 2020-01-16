import React, { useState, useEffect } from "react";
import SocketIOClient from "socket.io-client";
import MessageList from "./MessageList";
import MessageForm from "./NewMessage";
import UserList from "./UserList";
import faker from "faker";
import "./Chat.css";

const Chat = () => {
  const [name, setName] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [users, setUsers] = useState({});
  const [messages, setMessages] = useState([]);
  const [socket] = useState(SocketIOClient.connect("http://localhost:8000"));
  useEffect(() => {
    socket.on("Welcome", () => {
      if (!name) {
        const name = prompt("What's your name brah?");
        socket.emit("new_name", { name });
        setName(name);
      }
      setIsReady(true);
    });
    socket.on("data", data => {
      setUsers(data.users);
      setMessages(data.messages);
    });
    socket.on("new_user_connected", allUsers => setUsers(allUsers));
    socket.on("new_message_from_server", newMessageFromServer => {
      console.log(newMessageFromServer);
      console.log(messages);
      setMessages([newMessageFromServer, ...messages]);
    });
  }, [socket]);
  const submitNewMessage = newMessage => {
    if (newMessage.length) {
      const message = {
        usersName: name,
        _id: faker.random.uuid(),
        message: newMessage
      };
      setMessages([message, ...messages]);
      socket.emit("new_message", message);
    }
  };
  return !isReady ? (
    <h1 style={{ textAlign: "center" }}>Loading... </h1>
  ) : (
    <div className="chat-container">
      <h1>Welcome to the CHAT box.</h1>
      <div className="chat-box">
        <MessageList messages={messages} />
      </div>

      <UserList users={Object.values(users)} />

      <MessageForm submitNewMessage={submitNewMessage} />
    </div>
  );
};
export default Chat;
