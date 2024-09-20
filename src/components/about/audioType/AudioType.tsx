import React from "react";
import styles from "./Audiotype.module.css";
import Image from "next/image";
import { audioTypeType } from "@/util/types";
export default function AudioType({ audio }: { audio: audioTypeType }) {
  return (
    <div
      className={styles.audioTypeContainer}
      style={{ borderColor: audio.color, borderWidth: 1 }}
    >
      <div className={styles.titling}>
        <Image
          src={
            audio.imgUrl == "health.png" ? "/About/health.png" : audio.imgUrl
          }
          alt="img"
          width={85}
          height={85}
        />
        <span style={{ color: audio.textColor }}>{audio.title}</span>
      </div>
      <p style={{ color: audio.textColor }}>{audio.desc}</p>
    </div>
  );
}
