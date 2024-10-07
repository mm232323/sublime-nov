import React from "react";
import styles from "./Rank.module.css";
import Ranker from "./Ranker/Ranker";
import Link from "next/link";
export default async function Rank({
  email,
  type,
}: {
  email: string;
  type: string;
}) {
  const rankRes = await fetch("http://localhost:5800/user/get-rank", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const rank = await rankRes.json();
  console.log(rank);
  return (
    <div
      className={styles.rankContainer}
      style={type == "stranger" ? { alignSelf: "start" } : {}}
    >
      <h1>Rank {rank.user[1] + 1}</h1>
      {rank.prevU[0] && (
        <Link href={`/profile/${rank.prevU[0].userId}`}>
          <Ranker ranker={rank.prevU} type="stranger" />
        </Link>
      )}
      <Ranker ranker={rank.user} type="main" />
      {rank.nextU[0] && (
        <Link href={`/profile/${rank.nextU.userId}`}>
          <Ranker ranker={rank.nextU} type="stranger" />
        </Link>
      )}
    </div>
  );
}
