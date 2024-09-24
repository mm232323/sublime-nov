"use client";
import React from "react";
import styles from "./LogOutBut.module.css";
import { signOut } from "next-auth/react";
import { IoMdLogOut } from "react-icons/io";
export default function LogOutBut({ toggleNav }: { toggleNav: boolean }) {
  return (
    <button
      onClick={() => signOut()}
      className={toggleNav ? styles.miniLogOutBut : styles.logOutBut}
    >
      {toggleNav ? <IoMdLogOut size={25} className={styles.icon} /> : "logout"}
    </button>
  );
}
