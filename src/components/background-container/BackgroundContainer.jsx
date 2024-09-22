import React from "react";
import styles from "./BackgroundContainer.module.css";

const BackgroundContainer = ({ children }) => {
  return <div className={styles.backgroundContainer}>{children}</div>;
};

export default BackgroundContainer;
