"use client";
import React from "react";
import styles from "./reportForm.module.css";
import { useFormState } from "react-dom";
import { postReport } from "../../../../actions/main";
export default function ReportForm() {
  const [state, action] = useFormState(postReport, {
    errors: { reportType: "", reportTitle: "", reportMessage: "" },
  });

  return (
    <form className={styles.reportForm} action={action}>
      <select id="reportType" name="reportType">
        <option>Select</option>
        <option>UI error</option>
        <option>Slow Response</option>
        <option>Server down</option>
        <option>Bad response</option>
        <option>Other</option>
      </select>
      <input
        type="text"
        maxLength={30}
        placeholder="title"
        id="reportTitle"
        name="reportTitle"
      />
      <textarea
        maxLength={500}
        placeholder="message"
        id="reportMessage"
        name="reportMessage"
      />
      <button className={styles.reportBut}>report</button>
      <div>
        <p className={styles.errorMes}>{state?.reportType}</p>
        <p className={styles.errorMes}>{state?.reportTitle}</p>
        <p className={styles.errorMes}>{state?.reportMessage}</p>
      </div>
    </form>
  );
}
