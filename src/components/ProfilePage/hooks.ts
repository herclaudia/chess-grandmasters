import { useEffect, useState } from "react";

export const useFormatTimeSinceLastOnline = (lastOnline: number): string => {
  const currentTime = new Date().getTime();
  const lastOnlineTime = new Date(lastOnline * 1000).getTime();

  const timeDifferenceInSeconds = Math.floor(
    (currentTime - lastOnlineTime) / 1000
  );

  const [difference, setDifference] = useState(timeDifferenceInSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setDifference((prevDifference) => prevDifference + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(difference / 3600);
  const minutes = Math.floor((difference % 3600) / 60);
  const seconds = Math.floor(difference % 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
