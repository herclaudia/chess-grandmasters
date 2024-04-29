import ProfilePage from "@/components/ProfilePage";

type UsernameProps = {
  params: {
    username: string;
  };
};

export default function Username({ params: { username } }: UsernameProps) {
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div>
        <ProfilePage username={username} />
      </div>
    </main>
  );
}
