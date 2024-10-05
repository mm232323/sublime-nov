"use server";

import { albumInputsType } from "@/util/types";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import rand from "random-key";
export async function createAlbum(state: unknown, event: FormData) {
  const errors = { title: "", desc: "", audio: "", author: "", type: "" };
  const {
    title,
    desc,
    audio,
    photo,
    author,
    type,
    userEmail,
  }: albumInputsType = Object.fromEntries(event);
  const links: string = event.get("links") as string;
  const linksArr = links?.split(",");
  if (!audio.size) errors.audio = "Place set an audio";
  if (title.length < 5)
    errors.title = "Title Most be greater than 5 characters";
  if (desc.length < 10)
    errors.desc = "Description Most be greater than 10 characters";
  if (!author.length) errors.author = "Please Set an Author";
  if (!type.length || type == "Type") errors.type = "Please Choose Type";
  if (
    errors.title ||
    errors.desc ||
    errors.audio ||
    errors.author ||
    errors.type
  )
    return errors;
  const id = rand.generate(12);
  const output = {
    name: title,
    desc,
    imgUrl: photo.name,
    audioUrl: audio.name,
    author,
    id,
    type,
    links: linksArr,
    likes: 0,
    views: 0,
    reports: 0,
  };
  const response = await fetch("http://localhost:5800/create-album", {
    method: "POST",
    body: JSON.stringify({ album: output, email: userEmail }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const messageRes = await response.json();
  console.log("=======================");
  console.log(messageRes);
  console.log("=======================");
  const imgData = new FormData();
  imgData.append("image", photo);
  const imgRes = await axios.post("http://localhost:5800/handle-img", imgData);
  const imgMessage = await imgRes.data;
  console.log(imgMessage);
  console.log("=======================");
  const audioData = new FormData();
  audioData.append("audio", audio);
  const audioRes = await axios.post(
    "http://localhost:5800/handle-audio",
    audioData
  );
  const audioMessage = await audioRes.data;
  console.log(audioMessage);
  console.log("=======================");
  revalidatePath("/", "layout");
  redirect("/");
}

export async function handleLike(userId: string, albumId: string) {
  const response = await fetch("http://localhost:5800/handle-like", {
    method: "POST",
    body: JSON.stringify({ id: albumId, userId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const message = await response.json();
  console.log(message);
  revalidatePath("/album/[id]", "page");
}
export async function handleSave(userId: string, albumId: string) {
  const response = await fetch("http://localhost:5800/handle-save", {
    method: "POST",
    body: JSON.stringify({ id: albumId, userId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const message = await response.json();
  console.log(message);
}

export async function reportAlbum(state: unknown, event: FormData) {
  const errors = [];
  const title = event.get("title");
  const message = event.get("message");
  if (!title) errors.push("title");
  if (!message) errors.push("message");
  console.log(errors);
  if (errors.length > 0) return errors;
  const userId = event.get("user");
  const albumId = event.get("album");
  const reportData = { title, message, albumId };
  const response = await fetch("http://localhost:5800/handle-report", {
    method: "POST",
    body: JSON.stringify({ reportData, userId, albumId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resMessage = await response.json();
  console.log(resMessage);
}
