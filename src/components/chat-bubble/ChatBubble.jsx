import React from "react";
import styles from "./ChatBubble.module.css";
import PropTypes from "prop-types";

const renderTextWithLinks = (text) => {
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const elements = [];
  let counter = 1;
  let lastIndex = 0;

  const cleanText = (textSegment) => {
    return textSegment
      .replace(/,\s*\[.*?\]\(url\)/g, '')
      .replace(/,\s*$/, "")
      .replace(/,\s*and\s*$/, "")
      .replace(/(\s+and\s*)+$/, "")
      .replace(/\.\s*$/, "");
  };

  // Iterate over each Markdown-style link found
  text.replace(markdownLinkRegex, (fullMatch, name, url, offset) => {
    // Add any text before the current link
    if (lastIndex < offset) {
      const textSegment = text.substring(lastIndex, offset);
      elements.push(cleanText(textSegment));
    }

    // Push the link with prefix text only once
    elements.push(
      <React.Fragment key={`fragment-${counter}`}>
        {/* {counter === 1 ? "More information can be found at: " : ""} */}
        <div>
          <a href={url} key={counter} target="_blank" rel="noopener noreferrer">
            [{counter}] {name}
          </a>
        </div>
      </React.Fragment>
    );

    counter++;
    lastIndex = offset + fullMatch.length; // Update lastIndex to the end of the current match
  });

  // Add any remaining text after the last link
  if (lastIndex < text.length) {
    const finalTextSegment = text.substring(lastIndex);
    elements.push(cleanText(finalTextSegment)); // Apply cleanText to the final text segment    // elements.push(text.substring(lastIndex));
  }

  return (
    <>
      {elements.map((element, index) => (
        <React.Fragment key={index}>{element}</React.Fragment>
      ))}
    </>
  );
};

const ChatBubble = ({ text, isUser, avatar }) => (
  <div
    className={`${styles.bubble} ${
      isUser ? styles.userMessage : styles.botMessage
    }`}
  >
    {!isUser && avatar}
    <span className={styles.messageText}>{renderTextWithLinks(text)}</span>
  </div>
);

ChatBubble.propTypes = {
  text: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default ChatBubble;