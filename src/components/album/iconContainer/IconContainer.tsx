"use client";
import React, { ReactNode } from "react";
import styles from "./IconContainer.module.css";
import { handleLike, handleSave } from "../../../../actions/albums";
import { useState, useRef } from "react";
import { userType } from "@/util/types";
import Modal from "@/components/ui/Modal/Modal";
import { MdClose } from "react-icons/md";
import AlbumReportForm from "@/components/forms/albumReportForm/AlbumReportForm";
import { motion } from "framer-motion";
export default function IconContainer({
  children,
  color,
  size,
  condition,
  requiredInputs,
  user,
}: {
  children: ReactNode;
  color: string;
  size: number;
  condition: string;
  requiredInputs: string[];
  user: userType;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isLiked, setIsLiked] = useState(
    user?.likes?.includes(requiredInputs[1])
  );
  const [isSaved, setIsSaved] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const styling = {
    backgroundColor: isLiked ? color : "transparent",
    border: `1px ${isLiked ? "transparent" : color} solid`,
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  if (condition == "save") {
    styling.border = `1px ${isSaved ? "transparent" : color} solid`;
    styling.backgroundColor = isSaved ? color : "transparent";
  }
  if (condition == "report") {
    styling.border = `1px ${isReported ? "transparent" : color} solid`;
    styling.backgroundColor = isReported ? color : "transparent";
  }
  const handleActions = () => {
    if (condition == "like") {
      handleLike(requiredInputs[0], requiredInputs[1]);
      setIsLiked((toggleLike) => !toggleLike);
    }
    if (condition == "save") {
      handleSave(requiredInputs[0], requiredInputs[1]);
      setIsSaved((toggleSave) => !toggleSave);
    }
  };
  const handleReport = () => {
    dialogRef.current?.showModal();
  };
  const handleCloseReport = () => {
    dialogRef.current?.close();
    setIsReported(true);
  };
  return condition == "report" ? (
    <div
      className={styles.iconContainer}
      onClick={handleReport}
      style={styling}
    >
      <Modal ref={dialogRef}>
        <motion.div
          className={styles.reportContainer}
          variants={{
            show: { opacity: 1, filter: "blur(0)" },
            hide: { opacity: 0, filter: "blur(10px)" },
          }}
          initial="hide"
          animate="show"
          exit="hide"
        >
          <div className={styles.head}>
            <h1>Complete the Next Form to Confirm</h1>
            <div
              className={styles.closeIconContainer}
              onClick={() => dialogRef.current?.close()}
            >
              <MdClose color="#08000D" size={23} />
            </div>
          </div>
          <AlbumReportForm
            userId={requiredInputs[0]}
            albumId={requiredInputs[1]}
            onHandleClose={handleCloseReport}
          />
        </motion.div>
      </Modal>
      {children}
    </div>
  ) : (
    <div
      className={styles.iconContainer}
      onClick={handleActions}
      style={styling}
    >
      {children}
    </div>
  );
}
