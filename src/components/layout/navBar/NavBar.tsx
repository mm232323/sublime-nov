"use client";
import React from "react";
import styles from "./NavBar.module.css";
import Image from "next/image";
import Link from "next/link";
import { MdArrowRight } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiStar } from "react-icons/ci";
import { MdOutlineAlbum } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import LinkWithIcon from "@/components/ui/linkWithIcon/LinkWithIcon";
import LogOutBut from "@/components/ui/logOutBut/LogOutBut";
import { useState } from "react";
export default function NavBar({ isAuthed }: { isAuthed: boolean }) {
  const [toggleNav, setToggleNav] = useState(false);
  const handleToggle = () => setToggleNav((prevNav) => !prevNav);
  return (
    <div
      className={
        !toggleNav ? styles.navContainerWide : styles.navContainerNarrow
      }
    >
      <MdArrowRight
        color="white"
        size={36}
        className={!toggleNav ? styles.toggleArrow : styles.toggleArrowMini}
        onClick={handleToggle}
      />
      <center>
        <Image
          className={!toggleNav ? styles.logo : styles.miniLogo}
          src="/logo.svg"
          alt="logo"
          width={100}
          height={100}
        />
      </center>
      <div
        className={styles.linksContainer}
        style={toggleNav ? { paddingLeft: 0 } : {}}
      >
        <LinkWithIcon text="Dashboard" href="/" navState={toggleNav}>
          <MdHome color="white" size={22} />
        </LinkWithIcon>
        <LinkWithIcon text="Profile" href="/profile" navState={toggleNav}>
          <CgProfile color="white" size={22} />
        </LinkWithIcon>
        <LinkWithIcon text="Favourite" href="/fav" navState={toggleNav}>
          <CiStar color="white" size={22} />
        </LinkWithIcon>
        <LinkWithIcon text="Albums" href="/albums" navState={toggleNav}>
          <MdOutlineAlbum color="white" size={22} />
        </LinkWithIcon>
        <LinkWithIcon text="New Album" href="/new-album" navState={toggleNav}>
          <IoIosAdd color="white" size={22} />
        </LinkWithIcon>
        {isAuthed ? (
          <div style={{ left: !toggleNav ? -14 : 0, position: "relative" }}>
            <LogOutBut toggleNav={toggleNav} />
          </div>
        ) : (
          <>
            <Link href="/signup">
              <button
                className={!toggleNav ? styles.authBut : styles.authButMini}
                style={!toggleNav ? { position: "relative", left: -14 } : {}}
              >
                S{!toggleNav ? "ignup" : ""}
              </button>
            </Link>
            <Link href="/login">
              <button
                className={!toggleNav ? styles.authBut : styles.authButMini}
                style={!toggleNav ? { position: "relative", left: -14 } : {}}
              >
                L{!toggleNav ? "ogin" : ""}
              </button>
            </Link>
          </>
        )}
      </div>
      <div className={styles.moreInfo} style={toggleNav ? { gap: 20 } : {}}>
        <div
          className={styles.extraLinks}
          style={toggleNav ? { flexDirection: "column", gap: 15 } : {}}
        >
          <Link href="/about">
            <h1>about</h1>
          </Link>
          <Link href="/contact">
            <h1>Contact Us</h1>
          </Link>
          <Link href="/report">
            <h1>Report</h1>
          </Link>
        </div>
        {!toggleNav ? (
          <Image
            src="/Home/copyright.png"
            alt="copyrights"
            width={200}
            height={25}
            className={styles.copyright}
          />
        ) : (
          <Image
            src="/Home/copyrightmini.png"
            alt="copyrights"
            width={125}
            height={75.7}
            className={styles.copyrightmini}
          />
        )}
      </div>
    </div>
  );
}
