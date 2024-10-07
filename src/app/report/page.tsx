import Header from "@/components/layout/Header/Header";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import ReportForm from "@/components/forms/reportForm/reportForm";
export default function ReportPage() {
  return (
    <main className={styles.pageContainer}>
      <Image
        src="/Report/bg.png"
        alt="background image"
        width={1104}
        height={536}
        className={styles.pageBackground}
      />
      <Header auth={false} id={null} />
      <h1 className={styles.pageTitle}>Report</h1>
      <div className={styles.reportContainer}>
        <ReportForm />
        <Image
          src="/Report/police.png"
          alt="report image"
          width={726}
          height={885}
          className={styles.police}
        />
      </div>
    </main>
  );
}
