"use client";
import React from "react";
import styles from "./contactForm.module.css";
import { postContact } from "../../../../actions/main";
import { useFormState } from "react-dom";
import { useRef } from "react";
export default function ContactForm() {
  const checkRef = useRef(null);
  const [state, action] = useFormState(postContact, {
    errors: {
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      contactMessage: "",
    },
  });
  return (
    <form className={styles.contactForm} action={action}>
      <input
        type="text"
        maxLength={30}
        placeholder="Full Name"
        id="contactName"
        name="contactName"
        ref={checkRef}
      />
      <input
        type="email"
        placeholder="Email"
        id="contactEmail"
        name="contactEmail"
      />
      <input
        type="number"
        maxLength={11}
        minLength={11}
        id="contactPhone"
        name="contactPhone"
        placeholder="Phone Number"
      />
      <textarea
        maxLength={500}
        placeholder="message"
        id="contactMessage"
        name="contactMessage"
      />
      <button className={styles.contactBut}>
        {!state.contactName &&
        !state.contactEmail &&
        !state.contactPhone &&
        !state.contactMessage &&
        checkRef?.current?.value
          ? "Submitting..."
          : "Submit"}
      </button>
      <div>
        <p className={styles.errorMes}>{state?.contactName}</p>
        <p className={styles.errorMes}>{state?.contactEmail}</p>
        <p className={styles.errorMes}>{state?.contactPhone}</p>
        <p className={styles.errorMes}>{state?.contactMessage}</p>
      </div>
    </form>
  );
}
