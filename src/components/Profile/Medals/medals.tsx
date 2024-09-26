import React from "react";
import styles from "./medals.module.css";
import { IoMedal } from "react-icons/io5";
export default async function Medals({
  email,
  type,
}: {
  email: string;
  type: string;
}) {
  const medalsRes = await fetch("http://localhost:5800/user/get-medals", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const userMedals = (await medalsRes.json()).medals;
  const medals = [
    "rgba(255,255,255,.05)",
    "rgba(255,255,255,.05)",
    "rgba(255,255,255,.05)",
    "rgba(255,255,255,.05)",
    "rgba(255,255,255,.05)",
    "rgba(255,255,255,.05)",
    "rgba(255,255,255,.05)",
    "rgba(255,255,255,.05)",
  ];
  const colors = [
    "#CA6A25",
    "#B6B6B6",
    "#FFA800",
    "#3FAAC2",
    "#9204FF",
    "#05BA2C",
    "#A0191C",
    "#6987FF",
  ];
  for (let i = 0; i < userMedals.length; i++) {
    medals[i] = colors[i];
  }
  return (
    <div
      className={styles.medalsContainer}
      style={type == "stranger" ? { alignSelf: "start" } : {}}
    >
      {medals.map((medal) => (
        <IoMedal color={medal} key={Math.random()} size={66} />
      ))}
    </div>
  );
}
