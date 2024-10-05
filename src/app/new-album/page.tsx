import React from "react";
import Container from "@/components/layout/pageContainer/Container";
import NavBar from "@/components/layout/navBar/NavBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CreateAlbumForm from "@/components/forms/createAlbumForm/CreateAlbumForm";
export default async function NewAlbum() {
  const session = (await getServerSession())!;
  if (!session.user) redirect("/signup");
  return (
    <Container>
      <NavBar isAuthed={true} />
      <CreateAlbumForm email={session.user.email!} />
    </Container>
  );
}
