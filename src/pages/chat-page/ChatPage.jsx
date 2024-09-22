import { useState, useRef, useEffect } from "react";
import ChatBubble from "../../components/chat-bubble/ChatBubble";
import ChatInput from "../../components/chat-input/ChatInput";
import ToggleChatButton from "../../components/toggle-chat-button/ToggleChatButton";
import ChatbotImage from "../../components/chatbot-image/ChatBotImage";

import ExpandArrow from "../../assets/expandArrow.png";
import MinimizeArrow from "../../assets/minimizeArrow.png";
import ReduceArrow from "../../assets/reduceArrow.png";

import axios from "axios";
import styles from "./ChatPage.module.css";

const ChatPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [firstToggle, setFirstToggle] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async (userInput) => {
    if (!userInput.trim()) return;
    setIsTyping(true);
    const newUserMessage = { text: userInput, isUser: true };
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    setMessages((msgs) => [...msgs, newUserMessage]);

    try {
      const response = await axios.post(`${serverUrl}/chat`, {
        message: userInput,
      });
      setTimeout(() => {
        const botResponse = { text: response.data.response, isUser: false };
        setMessages((msgs) => [...msgs, botResponse]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setTimeout(() => {
        const errorMessage = {
          text: "Failed to get response from the server.",
          isUser: false,
        };
        setMessages((msgs) => [...msgs, errorMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    if (firstToggle) {
      setTimeout(() => {
        setMessages([{ text: "Hi! How can I help you?", isUser: false }]);
      }, 1000);
      setFirstToggle(false);
    }
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const scrollToBottom = () => {
      const current = messagesEndRef.current;
      if (current) {
        current.scrollTop = current.scrollHeight - current.clientHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  return (
    <>
      {showChat ? (
        <div
          className={`${styles.chatContainer} ${
            isExpanded ? styles.expanded : ""
          }`}
        >
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <ChatbotImage className={styles.chatbotAvatar} />
              <span className={styles.title}>MosaicMate</span>
            </div>
            <div className={styles.headerRight}>
              <button className={styles.expandButton} onClick={toggleExpand}>
                <img
                  src={isExpanded ? ReduceArrow : ExpandArrow}
                  alt="Toggle chat size"
                />
              </button>
              <button className={styles.minimizeButton} onClick={toggleChat}>
                <img src={MinimizeArrow} alt="Minimize chat" />
              </button>
            </div>
          </div>
          <div className={styles.messagesContainer} ref={messagesEndRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.isUser
                    ? styles.userMessageWrapper
                    : styles.messageWithAvatar
                }
              >
                {!msg.isUser && (
                  <ChatbotImage className={styles.chatbotAvatar} />
                )}
                <ChatBubble text={msg.text} isUser={msg.isUser} />
              </div>
            ))}
            {isTyping && (
              <div className={styles.messageWithAvatar}>
                <ChatbotImage className={styles.chatbotAvatar} />
                <div className={styles.typingIndicatorWrapper}>
                  <div className={styles.typingIndicator}>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <ChatInput onSend={handleSend} />
        </div>
      ) : (
        <ToggleChatButton onClick={toggleChat} />
      )}
    </>
  );
};

export default ChatPage;
