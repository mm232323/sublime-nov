import React from "react";
import styles from "./album.module.css";
import Image from "next/image";
import { albumType } from "@/util/types";
import { IoEye, IoHeart } from "react-icons/io5";
import Link from "next/link";
export default function UserAlbum({ album }: { album: albumType }) {
  return (
    <Link href={`/album/${album.id}`}>
      <div className={styles.albumContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={"http://localhost:5800/albums/" + album.imgUrl}
            alt="album img"
            width={104}
            height={149}
          />
        </div>
        <div className={styles.details}>
          <h1>{album.name}</h1>
          <p>{album.desc.slice(0, 100) + "..."}</p>
          <div className={styles.reactions}>
            <IoHeart />
            {album.likes}
            <IoEye />
            {album.views}
          </div>
        </div>
      </div>
    </Link>
  );
}
