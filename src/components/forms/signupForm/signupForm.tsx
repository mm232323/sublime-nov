"use client";
import React from "react";
import styles from "./signupForm.module.css";
import { signup } from "../../../../actions/auth";
import { useFormState } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
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
        id="job_title"
        name="job_title"
        type="text"
        placeholder="Set Your Job Title"
        style={state?.includes("job_title") ? { borderColor: "crimson" } : {}}
      />
      <select
        id="gender"
        name="gender"
        style={state?.includes("gender") ? { borderColor: "crimson" } : {}}
      >
        <option>Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <input
        id="phone"
        name="phone"
        type="number"
        placeholder="Phone Number"
        style={state?.includes("phone") ? { borderColor: "crimson" } : {}}
      />
      <button className={styles.signupBut}>Submit</button>
      <AnimatePresence>
        {state?.length && (
          <motion.p
            className={styles.errorMes}
            variants={{
              show: { opacity: 1, filter: "blur(0)", x: 0 },
              hide: { opacity: 0, filter: "blur(10px)", x: -30 },
            }}
            initial="hide"
            animate="show"
            exit="hide"
          >
            all fields should be valid
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
