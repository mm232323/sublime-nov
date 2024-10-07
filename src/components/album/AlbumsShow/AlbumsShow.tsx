"use client";
import React from "react";
import styles from "./AlbumsShow.module.css";
import AlbumReviewr from "../AlbumReviewer/AlbumReviewr";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { albumType } from "@/util/types";
import { useRef } from "react";
export default function AlbumsShow({ albums }: { albums: albumType[] }) {
  const containerRef = useRef<HTMLDivElement>();
  function scrollRight() {
    if (containerRef.current?.scrollLeft == 1750)
      containerRef.current?.scrollBy({
        left: -1750,
        behavior: "smooth",
      });
    else
      containerRef.current?.scrollBy({
        left: 250,
        behavior: "smooth",
      });
  }
  function scrollLeft() {
    if (containerRef.current?.scrollLeft == 0)
      containerRef.current?.scrollBy({
        left: 1750,
        behavior: "smooth",
      });
    else
      containerRef.current?.scrollBy({
        left: -250,
        behavior: "smooth",
      });
  }
  return (
    <div className={styles.controller}>
      <IoIosArrowBack
        color="white"
        size={19}
        className={styles.arrowIco}
        onClick={scrollLeft}
      />
      <div className={styles.albumsContainer} ref={containerRef}>
        {albums.map((album) => (
          <AlbumReviewr key={album.id} album={album} />
        ))}
      </div>
      <IoIosArrowForward
        color="white"
        size={19}
        className={styles.arrowIco}
        onClick={scrollRight}
      />
    </div>
  );
}
