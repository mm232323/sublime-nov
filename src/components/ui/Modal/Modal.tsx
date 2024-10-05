import React, { ForwardedRef, ReactNode, forwardRef } from "react";
import styles from "./Modal.module.css";
import { motion } from "framer-motion";
const Modal = forwardRef(
  (props: { children: ReactNode }, ref: ForwardedRef<HTMLDialogElement>) => {
    return (
      <motion.dialog
        variants={{
          show: { opacity: 1, filter: "blur(0)" },
          hide: { opacity: 0, filter: "blur(10px)" },
        }}
        initial="hide"
        animate="show"
        exit="hide"
        ref={ref}
        className={styles.popup}
      >
        {props.children}
      </motion.dialog>
    );
  }
);
Modal.displayName = "Modal";
export default Modal;
