import MemoryGame from "@/components/MemoryGame";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center">
      <MemoryGame />

      <div className="mt-20">
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
