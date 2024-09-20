/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
export default function Header({
  auth,
  id,
}: {
  auth: boolean;
  id: "string" | null;
}) {
  return (
    <>
      {!auth && (
        <div className={styles.headerContainer}>
          <header className={styles.header}>
            <Button href="/report" color="red">
              Report
            </Button>
            <div className={styles.container}>
              <h3>about</h3>
              <Image src="/logo.svg" alt="logo" width={100} height={100} />
              <Link href="/contact">
                <h3>contact</h3>
              </Link>
            </div>
            <div className={styles.forms}>
              <Button href="/signup" color="blue">
                Signup
              </Button>
              <Button href="/login" color="blue">
                Login
              </Button>
            </div>
          </header>
        </div>
      )}
    </>
  );
}
