/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import styles from "./AudioPlayer.module.css";
import { FaPlay } from "react-icons/fa";
import { ImPrevious2 } from "react-icons/im";
import { ImNext2 } from "react-icons/im";
import { FaRepeat } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import React, { useState, useRef, useEffect } from "react";
export default function AudioPlayer({ audio }: { audio: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isRepeatable, setIsRepeatable] = useState(false);
  const audioRef = useRef(new Audio(audio));
  const playedDuration = String(trackProgress / 60).split(".");
  const audioDuration = String(audioRef.current.duration / 60).split(".");
  const handleStart = () => {
    if (isPlaying) {
      audioRef.current.load();
      audioRef.current.play();
    } else {
      audioRef.current.load();
    }
  };
  const handlePlaying = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying((_prevAct: boolean) => false);
    } else {
      audioRef.current.play();
      setIsPlaying((_prevAct: boolean) => true);
      setInterval(() => {
        if (audioRef.current.ended) {
          if (isRepeatable) {
            handleStart();
          } else {
            return () => null;
          }
        } else {
          setTrackProgress(audioRef.current.currentTime);
        }
      }, 1000);
    }
  };
  function handleRepeat() {
    setIsRepeatable((prevAct) => !prevAct);
  }
  function handleNum(n: number) {
    if (n < 10) {
      return "0" + n;
    }
    if (n > 59) return n - 60;
    return n;
  }
  return (
    <div className={styles.audioplayerControler}>
      <div className={styles.controls}>
        <FaRepeat
          color={isRepeatable ? "tomato" : "white"}
          size={33}
          className={styles.icon}
          onClick={handleRepeat}
        />
        <ImPrevious2
          color="white"
          size={33}
          className={styles.icon}
          onClick={handleStart}
        />
        {isPlaying ? (
          <FaPause
            color="white"
            size={33}
            className={styles.icon}
            onClick={handlePlaying}
          />
        ) : (
          <FaPlay
            color="white"
            size={30}
            className={styles.icon}
            onClick={handlePlaying}
          />
        )}
        <ImNext2 color="white" size={33} className={styles.icon} />
      </div>
      <div className={styles.audiobar}>
        <p>
          {handleNum(+playedDuration[0])}:
          {handleNum(+playedDuration[1]?.slice(0, 2))}
        </p>
        <div className={styles.audioProgresser}>
          <div
            className={styles.audioFill}
            style={{
              width:
                trackProgress && trackProgress > 24
                  ? trackProgress * 2 - 14
                  : trackProgress + 10,
            }}
          ></div>
          <div
            className={styles.controlBall}
            style={{
              left:
                trackProgress && trackProgress > 24
                  ? trackProgress * 2 - 24
                  : trackProgress,
            }}
          ></div>
        </div>
        <p>
          {+audioDuration[1]?.slice(0, 2) > 59
            ? handleNum(+audioDuration[0] + 1)
            : handleNum(+audioDuration[0])}
          :{handleNum(+audioDuration[1]?.slice(0, 2))}
        </p>
      </div>
    </div>
  );
}
