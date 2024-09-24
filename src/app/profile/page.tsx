import React from "react";
import styles from "./page.module.css";
import NavBar from "@/components/layout/navBar/NavBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Profile() {
  const session = (await getServerSession())!;
  if (!session) redirect("/login");
  return (
    <>
      <NavBar isAuthed={true} />
    </>
  );
}
