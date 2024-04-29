import { useFormatTimeSinceLastOnline } from "@/components/ProfilePage/hooks";

type ClockLastOnlineProps = {
  lastOnline: number;
};

const ClockLastOnline = ({ lastOnline }: ClockLastOnlineProps) => {
  const formattedTime = useFormatTimeSinceLastOnline(lastOnline);
  return <>{formattedTime}</>;
};

export default ClockLastOnline;
