"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMenuOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function Header({
  auth,
  id,
}: {
  auth: boolean;
  id: "string" | null;
}) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const path = usePathname();
  const handleToggle = () => {
    setToggleMenu((prevToggle) => !prevToggle);
  };
  return (
    <>
      {!auth && (
        <div className={styles.headerContainer}>
          <header className={styles.header}>
            {!path.includes("report") ? (
              <div className={styles.extraBut}>
                <Button href="/report" color="red">
                  Report
                </Button>
              </div>
            ) : (
              <div className={styles.extraBut}>
                <Button href="/signup" color="blue">
                  Signup
                </Button>
              </div>
            )}
            <div className={styles.container}>
              <Link href="/about">
                <h3>about</h3>
              </Link>
              <Link href="/">
                <Image src="/logo.svg" alt="logo" width={100} height={100} />
              </Link>
              <Link href="/contact">
                <h3>contact</h3>
              </Link>
            </div>
            <div className={styles.container2}>
              <Link href="/">
                <Image src="/logo.svg" alt="logo" width={100} height={100} />
              </Link>
              <Link href="/about">
                <h3>about</h3>
              </Link>
              <Link href="/contact">
                <h3>contact</h3>
              </Link>
            </div>
            <div className={styles.container3}>
              <Link href="/">
                <Image src="/logo.svg" alt="logo" width={100} height={100} />
              </Link>
            </div>
            <div className={styles.forms}>
              {!path.includes("signup") ||
                (path.includes("report") && (
                  <Button href="/signup" color="blue">
                    Signup
                  </Button>
                ))}
              {!path.includes("login") && (
                <Button href="/login" color="blue">
                  Login
                </Button>
              )}
            </div>
            <IoMenuOutline
              size={26}
              color="white"
              className={styles.menuIco}
              onClick={handleToggle}
            />
          </header>
          <AnimatePresence>
            {toggleMenu && (
              <motion.div
                className={styles.menu}
                variants={{
                  show: { filter: "blur(0)", y: 0, opacity: 1 },
                  hide: { filter: "blur(10px)", y: -200, opacity: 0 },
                }}
                initial="hide"
                animate="show"
                exit="hide"
              >
                <IoCloseOutline
                  size={26}
                  color="white"
                  className={styles.closeIco}
                  onClick={handleToggle}
                />
                  <div className={styles.extraIn}>
                    {!path.includes("about") && (
                      <Link href="/about">
                        <h1>About</h1>
                      </Link>
                    )}
                    {!path.includes("contact") && (
                      <Link href="/contact">
                        <h1>Contact</h1>
                      </Link>
                    )}
                  </div>

                {!path.includes("signup") && (
                  <Link href="/signup">
                    <h1>Signup</h1>
                  </Link>
                )}
                {!path.includes("login") && (
                  <Link href="/login">
                    <h1>Login</h1>
                  </Link>
                )}
                {!path.includes("report") && (
                  <Link href="/report">
                    <h1>Report</h1>
                  </Link>
                )}
                <br></br>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
