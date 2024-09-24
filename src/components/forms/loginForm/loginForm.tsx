"use client";
import React from "react";
import styles from "./loginForm.module.css";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
export default function LoginForm() {
  async function handleLogin(event: FormData) {
    const userData = Object.fromEntries(event) as {
      email: string;
      password: string;
    };
    const res = await signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });
    if (res?.error) return console.log({ message: res.error });
    redirect("/");
  }
  return (
    <form className={styles.loginForm} action={handleLogin}>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        // style={state?.includes("email") ? { borderColor: "crimson" } : {}}
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password (6 - 18 letters & no spaces)"
        // style={state?.includes("password") ? { borderColor: "crimson" } : {}}
      />
      <button className={styles.loginBut}>Submit</button>
      {/* {state?.length && ( */}
      {/* <p className={styles.errorMes}>all fields should be valid</p> */}
      {/* )} */}
    </form>
  );
}
