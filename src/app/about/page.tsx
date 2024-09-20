import React from "react";
import Header from "@/components/layout/Header/Header";
import Image from "next/image";
import styles from "./page.module.css";
import AudioType from "@/components/about/audioType/AudioType";
import { audioTypeType } from "@/util/types";
import Worker from "@/components/about/worker/Worker";
import Link from "next/link";
export default async function About() {
  const res = await fetch("http://localhost:5800/about/audios");
  const audios = await res.json();
  return (
    <main>
      <Image
        src="/About/bg.png"
        alt="background"
        width={1440}
        height={3782}
        className={styles.bg}
      />
      <Header auth={false} id={null} />
      <section className={styles.descSec}>
        <Image
          src="/About/headphone.png"
          alt="headphones"
          width={651}
          height={685}
          className={styles.headphones}
        />
        <p className={styles.aboutSublime}>
          Are you tired of searching for the perfect place to stream your
          favorite tunes? Look no further! &quot;Sublime Nov&quot; is the
          ultimate website for all your audio streaming needs. With a plethora
          of features such as sharing, following, comments, and more, you can
          customize your listening experience like never before. Whether
          you&apos;re into the latest hits or discovering underground gems,
          &quot;Sublime Nov&quot; has got you covered. So why wait? Head on over
          to our website and start exploring the endless possibilities of audio
          streaming today.{" "}
        </p>
      </section>
      <section className={styles.audiosSec}>
        <h1>Our Audio Types</h1>
        <div className={styles.audiosContainer}>
          {audios.map((audio: audioTypeType) => (
            <AudioType audio={audio} key={audio.title} />
          ))}
        </div>
      </section>
      <section className={styles.teamSec}>
        <h1 className={styles.teamSecTitle}>Team Work</h1>
        <div className={styles.workersContainer}>
          <Worker imgUrl="/About/work1.jpg" job="Product Manager">
            Haliam Tomath
          </Worker>
          <Worker imgUrl="/About/work2.jpg" job="Content Reviewer">
            Maron Hanal
          </Worker>
          <Worker imgUrl="/About/work3.jpg" job="Sounds Engineer">
            Harry Manuial
          </Worker>
          <Worker imgUrl="/About/work4.jpg" job="Web Developer">
            Mickel Darian
          </Worker>
          <Worker imgUrl="/About/work5.jpg" job="Designer">
            Yozed Armn
          </Worker>
          <Worker imgUrl="/About/work6.jpg" job="Artist">
            Nickoles Adward
          </Worker>
        </div>
      </section>
      <section className={styles.contactSec}>
        <div className={styles.contentContainer}>
          <h1 className={styles.contactSecTitle}>Get in Touch</h1>
          <br></br>
          <p>
            Are you in need of some top-notch sound and audio services? Look no
            further, because Sublime Nova has got you covered! Whether
            you&apos;re looking to enhance your music, podcasts, or any other
            audio projects, they have the expertise to take your content to the
            next level.
          </p>
          <Link href="mailto:mohammed.qurany1@gmail.com">
            <button>Contact us</button>
          </Link>
        </div>
        <Image src="/About/radio.png" alt="radio" width={600} height={370} />
      </section>
    </main>
  );
}
