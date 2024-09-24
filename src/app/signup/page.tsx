import React from "react";
import Header from "@/components/layout/Header/Header";
import styles from "./page.module.css";
import SignupForm from "@/components/forms/signupForm/signupForm";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Signup() {
  const session = await getServerSession();
  if (session) redirect("/");
  return (
    <main className={styles.pageContainer}>
      <Header auth={false} id={null} />
      <h1 className={styles.pageTitle}>Signup</h1>
      <div className={styles.signupContainer}>
        <Image
          className={styles.devicesStyle1}
          src="/Signup/airpods.png"
          alt="airpods"
          width={1010}
          height={873}
        />
        <Image
          className={styles.devicesStyle2}
          src="/Signup/headphone.png"
          alt="headphone"
          width={1433}
          height={1600}
        />
        <SignupForm />
      </div>
    </main>
  );
}
