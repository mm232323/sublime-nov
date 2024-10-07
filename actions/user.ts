"use server";
import { revalidatePath } from "next/cache";
import axios from "axios";
export async function setAvatar(state: unknown, event: FormData) {
  const avatar = event.get("avatar") as File;
  const email = event.get("email") as string;
  if (avatar.size == 0) return;
  const data = new FormData();
  data.append("image", avatar);
  const response = await axios.post(
    `http://localhost:5800/user/set-avatar/${email}`,
    data
  );
  const message = await response.data;
  console.log(message);
  revalidatePath("/", "layout");
}

export async function fetchAvatar(email: string) {
  console.log(email);
  const response = await fetch(`http://localhost:5800/user/get-avatar`, {
    method: "POST",
    body: JSON.stringify({ email: email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const avatarName = await response.json();
  return avatarName.avatar;
}

export async function handleFollowing(follower: string, following: string) {
  const response = await fetch("http://localhost:5800/user/handle-follow", {
    method: "POST",
    body: JSON.stringify({ follower, following }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const message = await response.json();
  console.log(message);
  revalidatePath("/profile/[id]", "page");
}

export async function fetchUserFav(email: string) {
  const response = await fetch("http://localhost:5800/user/get-fav", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const albums = await response.json();
  console.log(albums.albums);
  return albums.albums
}
