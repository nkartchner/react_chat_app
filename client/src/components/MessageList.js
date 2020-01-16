import React from "react";

const MessageList = ({ messages }) =>
  messages.map(msg => (
    <div className="message" key={msg._id}>
      <p>
        {msg.usersName} wrote: {msg.message}
      </p>
    </div>
  ));
export default MessageList;
