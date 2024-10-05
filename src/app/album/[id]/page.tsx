import React from "react";
import styles from "./page.module.css";
import Container from "@/components/layout/pageContainer/Container";
import NavBar from "@/components/layout/navBar/NavBar";
import Image from "next/image";
import { albumType } from "@/util/types";
import axios from "axios";
import AudioPlayer from "@/components/album/audioPlayer/AudioPlayer";
import { FaEye, FaHeart, FaStar } from "react-icons/fa6";
import { MdReport } from "react-icons/md";
import IconContainer from "@/components/album/iconContainer/IconContainer";
import { getServerSession } from "next-auth";
import AlbumsShow from "@/components/album/AlbumsShow/AlbumsShow";
export default async function AlbumPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const session = await getServerSession();
  const email = session?.user?.email;
  const userRes = await fetch("http://localhost:5800/user/get-user", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const user = await userRes.json();
  const albumRes = await fetch(`http://localhost:5800/get-album`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const album: albumType = await albumRes.json();
  const audioRes = await axios.get(
    `http://localhost:5800/albums/${album.audioUrl}`,
    {
      method: "GET",
      responseType: "blob",
    }
  );
  if (typeof window !== "undefined") {
    const audioUrl = window.URL.createObjectURL(new Blob([audioRes.data]));
  }
  return (
    <Container>
      <NavBar isAuthed={true} />
      <div className={styles.pageContainer}>
        <div className={styles.albumDetailsContainer}>
          <div className={styles.detailsContainer}>
            <div className={styles.imgContainer}>
              <Image
                src={`http://localhost:5800/albums/${album.imgUrl}`}
                alt="album img"
                width={298}
                height={426}
              />
            </div>
            <div className={styles.textContainer}>
              <h1>{album.name}</h1>
              <p>
                <i>by: {album.author}</i>
              </p>
              <p>{album.desc.slice(0, 500)}.</p>
              <h3 className={styles.links}>
                External Links:{" "}
                {!album.links.length && <p>no external links</p>}
              </h3>
            </div>
          </div>
          <AudioPlayer
            audio={`http://localhost:5800/albums/${album.audioUrl}`}
          />
          <div className={styles.actions_reactions}>
            <div className={styles.reactions}>
              <FaEye color="white" size={22.455} />
              <p>
                {album.views > 10000
                  ? (album.views / 1000).toFixed(2) + "k"
                  : album.views > 1000000
                  ? (album.views / 1000000).toFixed(2) + "m"
                  : album.views}
              </p>
              <FaHeart color="white" size={22.455} />
              <p>
                {album.likes > 10000
                  ? (album.likes / 1000).toFixed(2) + "k"
                  : album.likes > 1000000
                  ? (album.likes / 1000000).toFixed(2) + "m"
                  : album.likes}
              </p>
            </div>
            <div className={styles.actions}>
              <IconContainer
                color="#0B87F9"
                size={44}
                condition="report"
                requiredInputs={[user.user.userId, id]}
                user={user}
              >
                <MdReport color="white" size={24} />
              </IconContainer>
              <IconContainer
                color="#F9B60B"
                size={44}
                condition="save"
                requiredInputs={[user.user.userId, id]}
                user={user}
              >
                <FaStar color="white" size={24} />
              </IconContainer>
              <IconContainer
                color="#E91F1F"
                size={44}
                condition="like"
                requiredInputs={[user.user.userId, id]}
                user={user}
              >
                <FaHeart color="white" size={24} />
              </IconContainer>
            </div>
          </div>
        </div>
        <div className={styles.extraAlbums}>
          <h1>Similar Albums</h1>
          <AlbumsShow album={album} />
        </div>
      </div>
    </Container>
  );
}
