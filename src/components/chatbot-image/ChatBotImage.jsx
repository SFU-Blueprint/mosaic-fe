import React from "react";
import chatbotImage from "../../assets/logo.png";
import styles from "./ChatbotImage.module.css";

const ChatbotImage = () => {
  return (
    <img src={chatbotImage} alt="Chatbot" className={styles.chatbotImage} />
  );
};

export default ChatbotImage;
