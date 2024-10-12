import React from "react";
import { redirect } from "next/navigation";
export default function Albums() {
  redirect("/");
  return <div>Albums</div>;
}
