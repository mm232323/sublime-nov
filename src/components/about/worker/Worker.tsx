import React from "react";
import styles from "./Worker.module.css";
import Image from "next/image";
export default function Worker({
  imgUrl,
  job,
  children,
}: {
  imgUrl: string;
  job: string;
  children: string;
}) {
  return (
    <div className={styles.workerContainer}>
      <Image src={imgUrl} alt="worker" width={284} height={284} />
      <h1 className={styles.workerName}>{children}</h1>
      <p>{job}</p>
    </div>
  );
}
