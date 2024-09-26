import React, { ReactNode } from "react";
import styles from "./Container.module.css";
export default function Container({ children }: { children: ReactNode }) {
  return <main className={styles.mainContainer}>{children}</main>;
}
