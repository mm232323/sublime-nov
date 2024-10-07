"use client";
import React from "react";
import styles from "./Filters.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
export default function Filters({
  onFiltering,
}: {
  onFiltering: (filters: string[]) => void;
}) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const handleActivition = (filter: string) => {
    if (activeFilters.includes(filter)) {
      onFiltering(activeFilters.filter((fil) => fil !== filter));
    } else {
      onFiltering([...activeFilters, filter]);
    }
    setActiveFilters((prevActives) => {
      let newCopy = [...prevActives];
      if (newCopy.includes(filter)) {
        newCopy = newCopy.filter((active) => active !== filter);
      } else {
        newCopy.push(filter);
      }
      return newCopy;
    });
  };
  const filters: string[] = [
    "comic",
    "drama",
    "action",
    "horror",
    "adventures",
    "puzzle",
    "philosophy",
    "history",
    "biography",
  ];
  return (
    <center>
      <motion.div
        variants={{
          show: { opacity: 1, filter: "blur(0)", y: 0 },
          hide: { opacity: 0, filter: "blur(12px)", y: -20 },
        }}
        initial="hide"
        animate="show"
        exit="hide"
        className={styles.filtersContainer}
      >
        {filters.map((filter: string) => (
          <div
            className={styles.filter}
            key={filter}
            style={
              activeFilters.includes(filter)
                ? { backgroundColor: "white", color: "#09000E" }
                : {}
            }
            onClick={() => handleActivition(filter)}
          >
            {filter}
          </div>
        ))}
      </motion.div>
    </center>
  );
}
