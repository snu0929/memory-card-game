import { useEffect, useState } from "react";

const shuffleCards = (cards) => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const initialCards = [
  { id: 1, value: 1 },
  { id: 2, value: 1 },
  { id: 3, value: 2 },
  { id: 4, value: 2 },
  { id: 5, value: 3 },
  { id: 6, value: 3 },
  { id: 7, value: 4 },
  { id: 8, value: 4 },
];

const useGameState = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setCards(shuffleCards(initialCards));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const resetGame = () => {
    setCards(shuffleCards(initialCards));
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setTimer(0);
  };

  return {
    cards,
    flippedCards,
    setFlippedCards,
    moves,
    setMoves,
    matches,
    setMatches,
    timer,
    setTimer,
    resetGame,
  };
};

export default useGameState;
