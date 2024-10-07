"use client";
import React from "react";
import styles from "./reportForm.module.css";
import { useFormState } from "react-dom";
import { postReport } from "../../../../actions/main";
import { AnimatePresence, motion } from "framer-motion";
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
      <AnimatePresence>
        {(state?.reportTitle || state?.reportType || state?.reportMessage) && (
          <motion.div
            variants={{
              show: { opacity: 1, filter: "blur(0)", x: 0 },
              hide: { opacity: 0, filter: "blur(10px)", x: -30 },
            }}
            initial="hide"
            animate="show"
            exit="hide"
          >
            <p className={styles.errorMes}>{state?.reportType}</p>
            <p className={styles.errorMes}>{state?.reportTitle}</p>
            <p className={styles.errorMes}>{state?.reportMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
