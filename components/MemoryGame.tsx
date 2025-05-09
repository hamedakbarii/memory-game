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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold my-10">Memory Game</h1>

      {gameOver && <h2 className="text-green-500 p-5">You WON! Congrats!</h2>}

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-4 gap-5 justify-center items-center mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`relative flex justify-center items-center text-4xl font-bold text-black w-20 h-20 md:w-28 md:h-28 bg-slate-200 transform cursor-pointer transition-transform duration-300 ${
                flipped.includes(index) || solved.includes(index)
                  ? "rotate-180"
                  : ""
              }`}
            >
              {flipped.includes(index) || solved.includes(index) ? (
                <Image
                  className="rotate-180 object-contain"
                  src={`/memory-cards/${card}.webp`}
                  alt="Memory Card"
                  fill
                  sizes="(max-width: 768px) 100%, (min-width: 768px) 100%"
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
        className="p-3 bg-slate-500 text-white rounded-md my-10"
      >
        Restart
      </button>
    </div>
  );
}
