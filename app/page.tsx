import MemoryGame from "@/components/MemoryGame";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MemoryGame />
      <div>
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
