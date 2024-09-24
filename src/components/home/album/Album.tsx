import { albumType } from "@/util/types";
import React from "react";
import Image from "next/image";
import styles from "./Album.module.css";
import { FaHeart } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
export default function Album({ album }: { album: albumType }) {
  return (
    <div className={styles.albumContainer}>
      <div className={styles.imgContainer}>
        <Image
          src={"/Albums" + album.imgUrl}
          alt="album image"
          width={1000}
          height={700}
        />
      </div>
      <h1>
        {album.name.length < 14 ? album.name : album.name.slice(0, 14) + "..."}
      </h1>
      <div className={styles.extraDetailsContainer}>
        <div className={styles.extraDetails}>
          <p className={styles.author}>{album.author.split(" ").slice(0, 2).join(" ")} </p>
          <FaHeart color="white" size={12} />
          <p>12.2k</p>
          <IoMdEye color="white" size={12} />
          <p>62.3k</p>
        </div>
      </div>
    </div>
  );
}
