import React from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";
import AvatarPicker from "../avatarPicker/AvatarPicker";
export default function Avatar({
  href,
  email,
}: {
  href: string;
  email: string;
}) {
  return (
    <div className={styles.avatarContainer}>
      <Image src={href} alt="avatar image" width={160} height={160} />
      <div className={styles.avatarUploader}>
        <p>Upload Avatar</p>
        <AvatarPicker email={email} />
      </div>
    </div>
  );
}
