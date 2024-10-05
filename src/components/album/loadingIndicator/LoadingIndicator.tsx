import React from "react";
import styles from "./LoadingIndicator.module.css";
export default function LoadingIndicator() {
  return (
    <div className={styles.typingIndicator}>
      <div className={styles.typingCircle}></div>
      <div className={styles.typingCircle}></div>
      <div className={styles.typingCircle}></div>
      <div className={styles.typingShadow}></div>
      <div className={styles.typingShadow}></div>
      <div className={styles.typingShadow}></div>
    </div>
  );
}
