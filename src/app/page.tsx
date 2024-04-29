import ChessmasterPage from "@/components/ChessmasterPage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div className="grid grid-cols-5">
        <ChessmasterPage />
      </div>
    </main>
  );
}
