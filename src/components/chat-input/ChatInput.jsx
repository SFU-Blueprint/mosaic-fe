import { useState } from "react";
import styles from "./ChatInput.module.css";

import sendButton from "../../assets/sendButton.png";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const send = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      send();
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your message"
      />
      <button className={styles.button} onClick={send}>
        <img src={sendButton} alt="Send" className={styles.sendIcon} />
      </button>
    </div>
  );
};

export default ChatInput;
