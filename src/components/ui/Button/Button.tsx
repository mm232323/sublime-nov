import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";
const Button = ({
  href,
  children,
  color,
}: {
  href: string;
  children: string;
  color: string;
}) => {
  return (
    <Link href={href}>
      <button
        className={color == "blue" ? styles.blueLinkBut : styles.redLinkBut}
      >
        {children}
      </button>
    </Link>
  );
};
export default Button;
