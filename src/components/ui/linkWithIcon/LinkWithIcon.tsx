"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import Link from "next/link";
import styles from "./LinkWithIcon.module.css";
import { AnimatePresence, motion } from "framer-motion";
export default function LinkWithIcon({
  children,
  text,
  href,
  navState,
}: {
  children: ReactNode;
  text: string;
  href: string;
  navState: boolean;
}) {
  const path = usePathname();
  return (
    <Link href={href}>
      <div
        className={!navState ? styles.linkContainer : styles.miniLinkContainer}
        style={{
          opacity: href == path ? 0.6 : 1,
          cursor: href == path ? "default" : "pointer",
        }}
      >
        {children}{" "}
        <AnimatePresence>
          {!navState ? (
            <motion.h1
              variants={{
                show: { opacity: 1, filter: "blur(0)", x: 0 },
                hide: { opacity: 0, filter: "blur(10px)", x: 50 },
              }}
              initial="hide"
              animate="show"
              exit="hide"
            >
              {text}
            </motion.h1>
          ) : (
            ""
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}
