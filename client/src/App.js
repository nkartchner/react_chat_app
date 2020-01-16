import React, { useState } from "react";
import Chat from "./components/Chat";
import "./App.css";

function App() {
  const [isChattingItUp, setWantsToChat] = useState(false);

  const wantsToChat = () => setWantsToChat(!isChattingItUp);
  return (
    <div className="App">
      {isChattingItUp ? (
        <Chat />
      ) : (
        <div>
          <button onClick={wantsToChat}>
            {!isChattingItUp ? "Chat?" : "Want to chat? Click HERE"}
          </button>
          <h1>Click the button above to start chatting it up.</h1>
        </div>
      )}
    </div>
  );
}

export default App;
