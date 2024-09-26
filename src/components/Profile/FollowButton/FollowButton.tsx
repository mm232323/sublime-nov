"use client";
import React from "react";
import styles from "./FollowButton.module.css";
import { handleFollowing } from "../../../../actions/user";
import { useState } from "react";
export default function FollowButton({
  follower,
  following,
  followerUserFollows,
}: {
  follower: string;
  following: string;
  followerUserFollows: string[];
}) {
  const [isFollowing, setIsFollowing] = useState(
    followerUserFollows?.includes(following)
  );
  return (
    <button
      className={isFollowing ? styles.followButDark : styles.followButLight}
      onClick={async () => {
        setIsFollowing((prevAns) => !prevAns);
        await handleFollowing(follower, following);
      }}
    >
      {isFollowing ? "UnFollow" : "Follow"}
    </button>
  );
}
