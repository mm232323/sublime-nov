/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import NavBar from "@/components/layout/navBar/NavBar";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import { IoSearch } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import Image from "next/image";
import LogOutBut from "@/components/ui/logOutBut/LogOutBut";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Filters from "@/components/home/filters/Filters";
import { AnimatePresence, motion } from "framer-motion";
import { albumType } from "@/util/types";
import Album from "@/components/home/album/Album";
import { fetchAlbums } from "../../actions/main";
import Container from "@/components/layout/pageContainer/Container";
import { fetchAvatar } from "../../actions/user";
import React from "react";
import { IoMdClose } from "react-icons/io";
export default function Home() {
  const { data: session } = useSession();
  const [toggleFilter, setToggleFilter] = useState(false);
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [avatar, setAvatar] = useState("");
  const [albums, setAlbums] = useState<albumType[]>([]);
  const [searchText, SetSearchText] = useState<string | undefined>("")!;
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const getAlbums = async () => {
      const albums = await fetchAlbums();
      setAlbums(albums);
    };
    const getAvatar = async () => {
      if (session?.user) {
        const avatar = await fetchAvatar(session?.user?.email as string);
        setAvatar(avatar);
      }
    };
    getAlbums();
    getAvatar();
  }, [session?.user, session?.user?.email]);
  const handleToggleFilter = () => setToggleFilter((prevTog) => !prevTog);
  const handleSeachText = () => {
    SetSearchText(searchRef.current?.value);
  };
  const handleFiltering = (filters: string[]) => {
    setFilters((prevFilters) => filters);
  };
  const handleToggleSearchBar = () => setToggleSearchBar((prevTog) => !prevTog);
  return (
    <Container>
      <AnimatePresence>
        {toggleSearchBar && (
          <motion.div
            className={styles.searchBarMenu}
            variants={{
              show: { opacity: 1, filter: "blur(0)", y: 0 },
              hide: { opacity: 0, filter: "blur(15px)", y: -60 },
            }}
            initial="hide"
            animate="show"
            exit="hide"
          >
            <input
              type="text"
              placeholder="search for novels, books, podcasts and albums"
              className={styles.searchingBar2}
              ref={searchRef}
              onChange={handleSeachText}
              defaultValue={searchRef.current?.value}
            />
            <IoMdClose
              color="white"
              size={25}
              cursor="pointer"
              onClick={handleToggleSearchBar}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <NavBar isAuthed={Boolean(session?.user)} />
      <div className={styles.pageContainer}>
        <div className={styles.head}>
          <IoSearch
            color="rgba(255,255,255,.7)"
            size={27.04}
            className={styles.searchIco}
            onClick={handleToggleSearchBar}
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
            <AnimatePresence>
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
            </AnimatePresence>
          </motion.div>
        </center>
      </div>
    </Container>
  );
}
