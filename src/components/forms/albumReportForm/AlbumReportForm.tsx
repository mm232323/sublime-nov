"use client";
import React from "react";
import styles from "./AlbumReportForm.module.css";
import { useFormState } from "react-dom";
import { reportAlbum } from "@/../../actions/albums";
const AlbumReportForm = (props: {
  userId: string;
  albumId: string;
  onHandleClose: () => void;
}) => {
  const [state, action] = useFormState(reportAlbum, []);
  return (
    <form className={styles.reportForm} action={action}>
      <input
        type="text"
        placeholder="title"
        name="title"
        style={
          state?.includes("title")
            ? { backgroundColor: "#ff00001f", color: "#290202" }
            : {}
        }
      />
      <input
        type="text"
        defaultValue={props.userId}
        style={{ display: "none" }}
        name="user"
      />
      <input
        type="text"
        defaultValue={props.albumId}
        style={{ display: "none" }}
        name="album"
      />
      <textarea
        placeholder="message"
        name="message"
        style={
          state?.includes("message") ? { backgroundColor: "#ff00001f" } : {}
        }
      />
      <button onClick={!state?.length ? props.onHandleClose : () => {}}>
        Submit
      </button>
    </form>
  );
};
export default AlbumReportForm;
