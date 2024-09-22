import React from 'react';
import styles from './ToggleChatButton.module.css';
import chatbotImage from '../../assets/logo.png'; 

const ToggleChatButton = ({ onClick }) => (
  <div className={styles.button} onClick={onClick}>
    <img src={chatbotImage} alt="Chatbot" className={styles.chatbotAvatar} />
  </div>
);

export default ToggleChatButton;
