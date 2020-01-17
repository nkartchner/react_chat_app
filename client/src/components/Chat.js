import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import MessageForm from "./NewMessage";
import UserList from "./UserList";
import io from "socket.io-client";
import faker from "faker";
import "./Chat.css";

const Chat = () => {
  const [name, setName] = useState("");
  const [socket] = useState(io(":8000"));
  const [users, setUsers] = useState({});
  const [messages, setMessages] = useState([]);
  const [isReady, setIsReady] = useState(false);

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
    socket.on("new_user_connected", setUsers);
    socket.on("new_message_from_server", msg =>
      setMessages(prevMessages => {
        return [msg, ...prevMessages];
      })
    );
    return () => {
      socket.disconnect();
    };
  }, []);

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
