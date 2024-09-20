import React from "react";
import Header from "@/components/layout/Header/Header";
import styles from "./page.module.css";
import SignupForm from "@/components/forms/signupForm/signupForm";
export default function Signup() {
  return (
    <main className={styles.pageContainer}>
      <Header auth={false} id={null} />
      <h1 className={styles.pageTitle}>Signup</h1>
      <div className={styles.signupContainer}>
        <SignupForm />
      </div>
    </main>
  );
}
