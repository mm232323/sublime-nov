import React from "react";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
export default function Albums() {
  redirect("/");
  return <div>Albums</div>;
}
