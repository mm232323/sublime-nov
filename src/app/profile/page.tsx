import React from "react";
import styles from "./page.module.css";
import NavBar from "@/components/layout/navBar/NavBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Container from "@/components/layout/pageContainer/Container";
import { FaPhone } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaTransgender } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import Album from "@/components/home/album/Album";
import { albumType, userType } from "@/util/types";
import Avatar from "@/components/Profile/Avatar/Avatar";
import Rank from "@/components/Profile/Rank/Rank";
import Medals from "@/components/Profile/Medals/medals";
import UserAlbum from "@/components/Profile/Album/album";
import Image from "next/image";
export default async function Profile() {
  const session = (await getServerSession())!;
  if (!session) redirect("/login");
  if (!session.user) redirect("/login");
  const userRes = await fetch("http://localhost:5800/user/get-user", {
    method: "POST",
    body: JSON.stringify({ email: session.user.email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { user }: { user: userType } = await userRes.json();
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
              <Avatar
                href={
                  !user.avatarName
                    ? "/avatar.svg"
                    : `http://localhost:5800/avatars/${user.avatarName}`
                }
                email={user.email}
              />
              <div className={styles.titles}>
                <h1>{user.name.split(" ").slice(0, 3).join(" ")}</h1>
                <p>{user.job_title}</p>
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

          <Rank email={user.email!} type="stranger" />
          <Medals email={user.email!} type="stranger" />
        </div>
        <div className={styles.albumsMainContainer}>
          {user.albums.length ? (
            <>
              <div className={styles.titles}>
                <h1>All Albums</h1>
                <p>({user.albums.length})</p>
              </div>
              <div className={styles.albumsContainer}>
                {user.albums.map((album) => (
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
