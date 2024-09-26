/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { useRef } from "react";
import styles from "./AvatarPicker.module.css";
import { setAvatar } from "../../../../actions/user";
import { useFormState } from "react-dom";
export default function AvatarPicker({ email }: { email: string }) {
  const [state, action] = useFormState(setAvatar, {});
  const avatarRef = useRef<HTMLInputElement>(null)!;
  const submitRef = useRef<HTMLButtonElement>(null)!;
  function handleChange() {
    submitRef?.current?.click();
  }
  return (
    <>
      <p
        className={styles.uploadBut}
        onClick={() => avatarRef.current?.click()}
      >
        click here to upload avatar
      </p>
      <form action={action}>
        <input
          ref={avatarRef}
          type="file"
          accept="image/*"
          style={{ display: " none" }}
          onChange={handleChange}
          id="avatar"
          name="avatar"
        />
        <input
          type="text"
          id="email"
          name="email"
          defaultValue={email}
          style={{ display: "none" }}
        />
        <button ref={submitRef} style={{ display: "none" }}>
          submit
        </button>
      </form>
    </>
  );
}
