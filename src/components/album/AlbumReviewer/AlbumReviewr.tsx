import React from "react";
import styles from "./AlbumReviewer.module.css";
import Image from "next/image";
import { albumType } from "@/util/types";
import { FaHeart } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import Link from "next/link";
export default function AlbumReviewr({ album }: { album: albumType }) {
  return (
    <Link href={`/album/${album.id}`}>
      <div className={styles.albumContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={"http://localhost:5800/albums/" + album.imgUrl}
            alt="album image"
            width={230}
            height={327.31}
          />
        </div>
        <div className={styles.details}>
          <h1>{album.name}</h1>
          <p className={styles.author}>{album.author}</p>
          <div className={styles.extraDetails}>
            <FaHeart color="white" size={12} />
            <p>{album.likes}</p>
            <IoMdEye color="white" size={12} />
            <p>{album.views}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
