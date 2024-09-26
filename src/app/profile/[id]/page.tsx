import React from "react";
import styles from "./page.module.css";
import Container from "@/components/layout/pageContainer/Container";
import NavBar from "@/components/layout/navBar/NavBar";
import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaTransgender } from "react-icons/fa6";
import { RiUserFollowFill } from "react-icons/ri";
import { albumType } from "@/util/types";
import Album from "@/components/home/album/Album";
import Rank from "@/components/Profile/Rank/Rank";
import Medals from "@/components/Profile/Medals/medals";
import UserAlbum from "@/components/Profile/Album/album";
import FollowButton from "@/components/Profile/FollowButton/FollowButton";
import { getServerSession } from "next-auth";
export default async function Profile({ params }: { params: { id: string } }) {
  const id = params.id;
  const session: { user: { email: string } } = (await getServerSession())!;
  const idRes = await fetch("http://localhost:5800/user/get-user", {
    method: "POST",
    body: JSON.stringify({ email: session.user.email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const myUserRes = (await idRes.json()).user;
  const userId = myUserRes.userId;
  const userRes = await fetch("http://localhost:5800/user/get-user-byId", {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const user = (await userRes.json()).user;
  return (
    <Container>
      <NavBar isAuthed={true} />
      <div className={styles.pageContainer}>
        <Image
          src="/Profile/bg.png"
          alt="profile page background"
          width={1101}
          height={732}
          style={{ position: "absolute" }}
        />
        <div className={styles.userInfoContainer}>
          <div className={styles.personalInfo}>
            <div className={styles.head}>
              <div className={styles.avatarcontainer}>
                <Image
                  src={
                    !user.avatarName
                      ? "/avatar.svg"
                      : `http://localhost:5800/avatars/${user.avatarName}`
                  }
                  alt="avatar"
                  width={160}
                  height={160}
                />
              </div>
              <div className={styles.titles}>
                <h1>{user.name.split(" ").slice(0, 3).join(" ")}</h1>
                <p>{user.jobTitle}</p>
              </div>
            </div>
            <div className={styles.extraDetails}>
              <div className={styles.info}>
                <FaPhone color="white" size={25} />
                &ensp;
                <p>{user.phone}</p>
              </div>
              <div className={styles.info}>
                <FaWhatsapp color="white" size={25} />
                &ensp;
                <p>{user.phone}</p>
              </div>
              <div className={styles.info}>
                <FaTransgender color="white" size={25} />
                &ensp;
                <p>{user.gender}</p>
              </div>
              <div className={styles.info}>
                <RiUserFollowFill color="white" size={25} />
                &ensp;
                <p>
                  {user.followers > 1000000
                    ? (user.followers / 1000000).toFixed(1) + "m"
                    : user.followers > 1000
                    ? (user.followers / 1000).toFixed(1) + "k"
                    : user.followers}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.recentAlbumsContainer}>
            <h1>Recent Albums</h1>
            <div className={styles.recentAlbums}>
              {user.albums.length ? (
                user.albums
                  .slice(0, 3)
                  .map((album: albumType) => (
                    <Album album={album} size="small" key={album.imgUrl} />
                  ))
              ) : (
                <p style={{ opacity: 0.6, paddingLeft: 10 }}>
                  no albums inserted
                </p>
              )}
            </div>
          </div>
          <div className={styles.worldUser}>
            <div className={styles.awards}>
              <Rank email={user.email!} type="user" />
              <Medals email={user.email!} type="user" />
            </div>
            <FollowButton
              follower={userId}
              following={id}
              followerUserFollows={myUserRes.follows}
            />
          </div>
        </div>
        <div className={styles.albumsMainContainer}>
          {user.albums.length ? (
            <>
              <div className={styles.titles}>
                <h1>All Albums</h1>
                <p>({user.albums.length})</p>
              </div>
              <div className={styles.albumsContainer}>
                {user.albums.map((album: albumType) => (
                  <UserAlbum album={album} key={album.imgUrl} />
                ))}
              </div>
            </>
          ) : (
            <p style={{ opacity: 0.7 }}>no albums inserted</p>
          )}
        </div>
      </div>
    </Container>
  );
}
