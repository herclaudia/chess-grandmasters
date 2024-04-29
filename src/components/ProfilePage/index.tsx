"use client";

import { useProfileState } from "@/state/profile";
import { useEffect } from "react";
import Loading from "../shared/Loading";
import ErrorMessage from "../shared/ErrorMessage";
import Link from "next/link";
import ClockLastOnline from "./ClockLastOnline";

type ProfilePageProps = {
  username: string;
};

const ProfilePage = ({ username }: ProfilePageProps) => {
  const { state, fetchProfilePage } = useProfileState({ username });
  useEffect(() => {
    fetchProfilePage();
  }, [fetchProfilePage]);

  const { data, isLoading, error } = state;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!data) {
    return <ErrorMessage error="Invalid username." />;
  }

  return (
    <>
      <div>
        <b>{username}</b>&apos;s page details
      </div>
      <div>
        <img
          className="w-20 h-20 rounded-full"
          src={data.avatar}
          alt={username}
        />
      </div>
      <div>Player Id: {data.player_id}</div>
      <div>
        URL:{" "}
        <Link className="text-blue-600 hover:underline" href={data.url}>
          {data.url}
        </Link>
      </div>
      <div>Title: {data.title}</div>
      <div>Status: {data.status}</div>
      <div>Is Streamer: {data.is_streamer ? "Yes" : "No"}</div>
      <div>Verified: {data.verified ? "Yes" : "No"}</div>
      <div>
        Last online: <ClockLastOnline lastOnline={data.last_online} /> time ago.
      </div>
    </>
  );
};

export default ProfilePage;
