import React from "react";
import styles from "./Rank.module.css";
import Ranker from "./Ranker/Ranker";
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
  return (
    <div
      className={styles.rankContainer}
      style={type == "stranger" ? { alignSelf: "start" } : {}}
    >
      <h1>Rank {rank.user[1] + 1}</h1>
      {rank.prevU[0] && <Ranker ranker={rank.prevU} />}
      <Ranker ranker={rank.user} />
      {rank.nextU[0] && <Ranker ranker={rank.nextU} />}
    </div>
  );
}
