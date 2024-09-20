"use client";
import React from "react";
import styles from "./signupForm.module.css";
import { signup } from "../../../../actions/auth";
import { useFormState } from "react-dom";
export default function SignupForm() {
  const [state, action] = useFormState(signup, []);
  return (
    <form className={styles.signupForm} action={action}>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Full Name"
        style={state?.includes("name") ? { borderColor: "crimson" } : {}}
      />
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        style={state?.includes("email") ? { borderColor: "crimson" } : {}}
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password (6 - 18 letters & no spaces)"
        style={state?.includes("password") ? { borderColor: "crimson" } : {}}
      />
      <input
        id="phone"
        name="phone"
        type="number"
        placeholder="Phone Number"
        style={state?.includes("phone") ? { borderColor: "crimson" } : {}}
      />
      <button className={styles.signupBut}>Submit</button>
      {state?.length && (
        <p className={styles.errorMes}>all fields should be valid</p>
      )}
    </form>
  );
}
