import React from "react";
import Header from "@/components/layout/Header/Header";
import styles from "./page.module.css";
import ContactForm from "@/components/forms/contactForm/contactForm";
import Image from "next/image";
export default function Contact() {
  return (
    <main className={styles.pageContainer}>
      <Header auth={false} id={null} />
      <h1 className={styles.pageTitle}>contact</h1>
      <div className={styles.contactContainer}>
        <ContactForm />
        <Image
          src="/Contact/contactingImg.png"
          alt="contacting image"
          width={660}
          height={660}
          className={styles.contactImage}
        />
      </div>
    </main>
  );
}
