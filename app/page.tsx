import MemoryGame from "@/components/MemoryGame";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between">
      <MemoryGame />

      <div className="my-10">
        Made with ❤️ by{" "}
        <Link
          href={"https://www.hamedakbri.ir"}
          className="font-bold transition-all duration-300 hover:opacity-75"
        >
          Hamed Akbari
        </Link>{" "}
      </div>
    </main>
  );
}
