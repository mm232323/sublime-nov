/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import Container from "@/components/layout/pageContainer/Container";
import NavBar from "@/components/layout/navBar/NavBar";
import { redirect } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Filters from "@/components/home/filters/Filters";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import { FaFilter } from "react-icons/fa6";
import LogOutBut from "@/components/ui/logOutBut/LogOutBut";
import { fetchAvatar, fetchUserFav } from "../../../actions/user";
import { albumType } from "@/util/types";
import Album from "@/components/home/album/Album";
export default function Favourite() {
  const { data: session } = useSession();
  if (!session?.user) redirect("/signup");
  const user = session.user as { email: string; password: string };
  const [toggleFilter, setToggleFilter] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [avatar, setAvatar] = useState("");
  const [albums, setAlbums] = useState<albumType[]>([]);
  const [searchText, SetSearchText] = useState<string | undefined>("")!;
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const getAlbums = async () => {
      const albums = await fetchUserFav(user.email);
      setAlbums(albums);
    };
    const getAvatar = async () => {
      if (session?.user) {
        const avatar = await fetchAvatar(user.email);
        setAvatar(avatar);
      }
    };
    getAlbums();
    getAvatar();
  }, [session?.user, user, user.email]);
  const handleToggleFilter = () => setToggleFilter((prevTog) => !prevTog);
  const handleSeachText = () => {
    SetSearchText(searchRef.current?.value);
  };
  const handleFiltering = (filters: string[]) => {
    console.log(filters);
    setFilters((prevFilters) => filters);
  };
  return (
    <Container>
      <NavBar isAuthed={true} />
      <div className={styles.pageContainer}>
        <div className={styles.head}>
          <IoSearch
            color="rgba(255,255,255,.7)"
            size={27.04}
            className={styles.searchIco}
          />
          <input
            type="text"
            placeholder="search for novels, books, podcasts and albums"
            className={styles.searchingBar}
            ref={searchRef}
            onChange={handleSeachText}
          />
          <FaFilter
            size={50.04}
            color={toggleFilter ? "#09000E" : "rgba(255,255,255,.7)"}
            className={styles.filterIco}
            onClick={handleToggleFilter}
            style={
              toggleFilter
                ? {
                    backgroundColor: "white",
                  }
                : {
                    backgroundColor: "rgba(255,255,255,.08)",
                  }
            }
          />
          {session?.user ? (
            <>
              <Link href="/profile">
                <Image
                  src={
                    !avatar
                      ? "/avatar.svg"
                      : `http://localhost:5800/avatars/${avatar}`
                  }
                  alt=""
                  width={50}
                  height={50}
                  className={styles.avatar}
                />
              </Link>
              <LogOutBut toggleNav={false} />
            </>
          ) : (
            <>
              <Link href="/signup">
                <button className={styles.authBut}>Signup</button>
              </Link>
              <Link href="/login">
                <button className={styles.authBut}>Login</button>
              </Link>
            </>
          )}
        </div>
        <AnimatePresence>
          {toggleFilter && <Filters onFiltering={handleFiltering} />}
        </AnimatePresence>
        <center>
          <motion.div
            className={styles.albumsContainer}
            initial={{ y: toggleFilter ? 20 : 60 }}
            animate={{ y: toggleFilter ? 60 : 20 }}
          >
            {albums
              .filter((album) => {
                if (
                  !album?.name
                    ?.toLowerCase()
                    .includes(searchText!.toLowerCase())
                )
                  return false;
                for (let i = 0; i < filters.length; i++) {
                  if (!album.types.includes(filters[i])) return false;
                }
                return true;
              })
              .map((album) => (
                <Album album={album} size="large" key={Math.random()} />
              ))}
          </motion.div>
        </center>
      </div>
    </Container>
  );
}
