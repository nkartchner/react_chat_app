import React, { useState } from "react";

const MessageForm = ({ submitNewMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const submit = () => {
    submitNewMessage(newMessage);
    setNewMessage("");
  };
  const handleChatChange = e => setNewMessage(e.target.value);
  return (
    <div className="inputbox">
      <input
        onChange={handleChatChange}
        value={newMessage}
        onKeyDown={e => e.keyCode === 13 && submit()}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
};

export default MessageForm;
