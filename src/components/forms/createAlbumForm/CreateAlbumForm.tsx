"use client";
import React from "react";
import styles from "./CreateAlbumForm.module.css";
import { useFormState } from "react-dom";
import { useRef, useState } from "react";
import { createAlbum } from "../../../../actions/albums";
import { SlCloudUpload } from "react-icons/sl";
import { TiUpload } from "react-icons/ti";
import Image from "next/image";
import LoadingAndicator from "@/components/album/loadingIndicator/LoadingIndicator";
import { IoClose } from "react-icons/io5";
export default function CreateAlbumForm({ email }: { email: string }) {
  const [audioName, setAudioName] = useState("");
  const [imgReview, setImgReview] = useState<string | ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLInputElement>(null);
  const [state, action] = useFormState(createAlbum, {
    audio: "",
    title: "",
    desc: "",
    author: "",
    type: "",
  });
  const handleUploadedAudio = () => {
    if (audioRef.current) {
      setAudioName(
        `${audioRef.current.files![0].name} -- ${(
          audioRef.current.files![0].size / 1000000
        ).toFixed(1)}mg`
      );
    }
  };
  const handleUploadedImg = () => {
    const img = imgRef.current?.files![0];
    if (img!.size > 5000000) return;
    const reader = new FileReader();
    reader.onloadstart = () => {
      setIsLoading(true);
    };
    reader.onloadend = () => {
      setImgReview(reader.result);
      setIsLoading(false);
    };
    reader.readAsDataURL(img!);
  };
  const handleRemoveImg = () => {
    setImgReview(null);
    imgRef.current?.files != null;
  };
  return (
    <form action={action} className={styles.formContainer}>
      <div
        className={styles.imgUploadContainer}
        style={
          state?.audio ? { backgroundColor: "rgba(204, 24, 24, 0.2)" } : {}
        }
      >
        <SlCloudUpload color="rgba(255,255,255,.6)" size={106} />
        <p>
          {audioName ? (
            <>
              {audioName} (
              <span onClick={() => audioRef.current?.click()}>change</span>)
            </>
          ) : (
            <>
              upload your album audio direction here or{" "}
              <span onClick={() => audioRef.current?.click()}>
                search desktop
              </span>{" "}
              (max size 10mg)
            </>
          )}
        </p>
      </div>
      <div
        className={styles.imgUploadContainer}
        style={
          state?.audio ? { backgroundColor: "rgba(204, 24, 24, 0.2)" } : {}
        }
      >
        {isLoading && <LoadingAndicator />}
        {imgReview && !isLoading ? (
          <div className={styles.imgReviewContainer}>
            <Image
              src={imgReview as string}
              alt="img review"
              width={200}
              height={200}
            />
            <div className={styles.remover} onClick={handleRemoveImg}>
              <IoClose color="rgba(255,255,255,.7)" size={22} />
            </div>
          </div>
        ) : (
          <TiUpload color="rgba(255,255,255,.6)" size={106} />
        )}
        <p>
          please your album image direction here or{" "}
          <span onClick={() => imgRef.current?.click()}>search desktop</span>{" "}
          (max size 10mg)
        </p>
      </div>
      <input
        type="text"
        name="userEmail"
        defaultValue={email}
        style={{ display: "none" }}
      />
      <input
        type="file"
        name="audio"
        accept="audio/*"
        style={{ display: "none" }}
        ref={audioRef}
        onChange={handleUploadedAudio}
      />
      <input
        type="file"
        name="photo"
        accept="image/*"
        style={{ display: "none" }}
        ref={imgRef}
        onChange={handleUploadedImg}
      />
      <input
        type="text"
        name="title"
        placeholder={state?.title ? state?.title : "Album Title"}
        style={
          state?.title ? { backgroundColor: "rgba(204, 24, 24, 0.2)" } : {}
        }
      />
      <textarea
        name="desc"
        placeholder={state?.desc ? state?.desc : "Album Description"}
        style={state?.desc ? { backgroundColor: "rgba(204, 24, 24, 0.2)" } : {}}
      />
      <input
        type="text"
        name="author"
        placeholder={state?.author ? state?.author : "Author"}
        style={
          state?.author ? { backgroundColor: "rgba(204, 24, 24, 0.2)" } : {}
        }
      />
      <select
        name="type"
        style={state?.type ? { backgroundColor: "rgba(204, 24, 24, 0.2)" } : {}}
      >
        <option>Type</option>
        <option>Comic</option>
        <option>Drama</option>
        <option>Action</option>
        <option>Horror</option>
        <option>Adventures</option>
        <option>New</option>
        <option>Puzzle</option>
        <option>Philosophy</option>
        <option>History</option>
        <option>Geography</option>
      </select>
      <input type="text" name="links" placeholder='Links (seperated by ",")' />
      <button>Submit</button>
    </form>
  );
}
