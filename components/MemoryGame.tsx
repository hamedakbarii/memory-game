"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const generateDeck = () => {
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

  const deck = [...memoryCards, ...memoryCards];
  return deck.sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [cards, setCards] = useState<string[]>(generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);

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

  const gameOver = solved.length === cards.length;

  const resetGame = () => {
    setCards(generateDeck());
    setFlipped([]);
    setSolved([]);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="font-bold text-3xl py-10">Memory Game</h1>

      {gameOver && <h2 className="text-green-500 p-5">You WON! Congrats!</h2>}

      <div className="w-full max-w-md mx-auto px-2">
        <div className="grid grid-cols-4 gap-2 sm:gap-5 mt-5 justify-center">
          {cards.map((card, index) => (
            <div
              className={`flex justify-center text-4xl font-bold text-black items-center sm:w-28 w-[70px] sm:h-28 h-[70px] bg-slate-200 transform cursor-pointer transition-transform duration-300 ${
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
                "?"
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={resetGame}
        className="flex p-5 bg-slate-500 rounded-md mt-5"
      >
        Restart
      </button>
    </div>
  );
}
