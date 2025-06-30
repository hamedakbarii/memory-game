"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ImagePreloader from "./ImagePreloader";
import { useTheme } from "./ThemeProvider";

const memoryCards = [
  "dwarf",
  "orc-connector",
  "elf",
  "orcish-ai-nextjs-framework",
  "orcishcity",
  "orcishlogo",
  "orcishmage",
  "textualgames",
];

const generateDeck = () => {
  const deck = [...memoryCards, ...memoryCards];
  return deck.sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const { theme, toggleTheme } = useTheme();
  const [cards, setCards] = useState<string[]>(generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [timer, setTimer] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [bestTime, setBestTime] = useState<number | null>(null);

  const gameOver = solved.length === cards.length;

  // Load best time from localStorage on component mount
  useEffect(() => {
    const savedBestTime = localStorage.getItem("memoryGameBestTime");
    if (savedBestTime) {
      setBestTime(parseInt(savedBestTime));
    }
  }, []);

  // Update best time when game is won
  useEffect(() => {
    if (gameOver && timer > 0) {
      if (!bestTime || timer < bestTime) {
        setBestTime(timer);
        localStorage.setItem("memoryGameBestTime", timer.toString());
      }
    }
  }, [gameOver, timer, bestTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !gameOver) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, gameOver]);

  useEffect(() => {
    // Start the timer on first card flip
    if (flipped.length === 1 && !isActive) {
      setIsActive(true);
    }
  }, [flipped, isActive]);

  useEffect(() => {
    const checkForMatch = () => {
      const [first, second] = flipped;

      if (cards[first] === cards[second]) {
        setSolved([...solved, ...flipped]);
      }
      setFlipped([]);
    };

    if (flipped.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 1000);
    }
  }, [cards, flipped, solved]);

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };

  const resetGame = () => {
    setCards(generateDeck());
    setFlipped([]);
    setSolved([]);
    setTimer(0);
    setIsActive(false);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center gap-10 py-8">
      <ImagePreloader images={memoryCards} />
      <div className="flex items-center w-full px-4">
        <h1 className="font-bold text-3xl py-10 flex justify-center items-center w-full">
          Memory Game
        </h1>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-semibold">Time: {formatTime(timer)}</div>
        {bestTime !== null && (
          <div className="text-lg text-blue-600 dark:text-blue-400">
            Best Time: {formatTime(bestTime)}
          </div>
        )}
      </div>

      {gameOver && (
        <div className="text-center">
          <h2 className="text-green-600 dark:text-green-400 p-5">
            You WON! Congrats!
          </h2>
          <p className="text-lg">Your time: {formatTime(timer)}</p>
          {bestTime === timer && (
            <p className="text-yellow-600 dark:text-yellow-400 font-bold mt-2">
              🏆 New Best Time! 🏆
            </p>
          )}
        </div>
      )}

      <div className="w-full max-w-md mx-auto px-2">
        <div className="grid grid-cols-4 gap-2 sm:gap-5 mt-5 justify-center">
          {cards.map((card, index) => (
            <div
              className={`flex justify-center text-4xl font-bold items-center sm:w-28 w-[70px] sm:h-28 h-[70px] bg-gray-100 dark:bg-gray-700 shadow-md hover:shadow-lg transform cursor-pointer transition-all duration-300 ${
                flipped.includes(index) || solved.includes(index)
                  ? "rotate-180"
                  : ""
              }`}
              key={index}
              onClick={() => handleClick(index)}
            >
              {flipped.includes(index) || solved.includes(index) ? (
                <Image
                  className="rotate-180 object-contain"
                  src={`/memory-cards/${card}.webp`}
                  alt="Memory Card"
                  width={112}
                  height={112}
                />
              ) : (
                <span className="text-gray-600 dark:text-gray-300">?</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={resetGame}
        className="flex p-5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md mt-5 transition-colors"
      >
        Restart
      </button>
    </section>
  );
}
