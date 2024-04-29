"use client";

import { useChessMastersState } from "@/state/chessmasters";
import Link from "next/link";
import { useEffect } from "react";
import Loading from "../shared/Loading";
import ErrorMessage from "../shared/ErrorMessage";

const ChessmasterPage = () => {
  const { state, fetchData } = useChessMastersState();

  useEffect(() => {
    fetchData();
  }, []);

  const { data, isLoading, error } = state;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      {data.map((username) => (
        <Link
          key={username}
          href={`/chessmaster/${username}`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {username}
        </Link>
      ))}
    </>
  );
};

export default ChessmasterPage;
