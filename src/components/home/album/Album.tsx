import { albumType } from "@/util/types";
import React from "react";
import Image from "next/image";
import styles from "./Album.module.css";
import { FaHeart } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import Link from "next/link";
export default function Album({
  album,
  size,
}: {
  album: albumType;
  size: string;
}) {
  return (
    <Link href={`/album/${album.id}`}>
      <div
        className={styles.albumContainer}
        style={size === "small" ? { gap: 5 } : {}}
      >
        <div
          className={styles.imgContainer}
          style={
            size == "small" ? { width: 104, height: 104, borderRadius: 8 } : {}
          }
        >
          <Image
            src={"http://localhost:5800/albums/" + album.imgUrl}
            alt="album image"
            width={size === "small" ? 510 : 1000}
            height={size === "small" ? 357 : 700}
          />
        </div>
        <h1 style={size == "small" ? { fontSize: 19.5 } : {}}>
          {album.name.length < 14
            ? album.name
            : album.name.slice(0, 14) + "..."}
        </h1>
        <div
          className={styles.extraDetails}
          style={size === "small" ? { gap: 10 } : {}}
        >
          {size == "large" && (
            <p className={styles.author}>
              {album.author.split(" ").slice(0, 2).join(" ")}{" "}
            </p>
          )}

          <FaHeart color="white" size={12} />
          <p style={size == "small" ? { fontSize: 13 } : {}}>{album.likes}</p>
          <IoMdEye color="white" size={12} />
          <p style={size == "small" ? { fontSize: 13 } : {}}>{album.views}</p>
        </div>
      </div>
    </Link>
  );
}
