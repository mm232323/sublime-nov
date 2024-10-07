import React from "react";
import styles from "./Ranker.module.css";
import Image from "next/image";
import { userType } from "@/util/types";
import { BiAlbum } from "react-icons/bi";
export default function Ranker({
  ranker,
  type,
}: {
  ranker: [userType, number];
  type: string;
}) {
  return (
    <div
      className={styles.rankerContainer}
      style={type == "stranger" ? { cursor: "pointer" } : {}}
    >
      <Image
        src={
          !ranker[0].avatarName
            ? "/avatar.svg"
            : `http://localhost:5800/avatars/${ranker[0].avatarName}`
        }
        alt="ranker avatar"
        width={30}
        height={30}
        className={styles.rankerAvatar}
      />
      <p>{ranker[1] + 1}</p>
      <BiAlbum size={20} color="white" />
      <p>{ranker[0].albums.length}</p>
    </div>
  );
}
