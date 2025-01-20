import React, { useEffect, useState } from 'react'
import useGameState from '../hooks/useGameState'
import { Card } from './Card'
export const MemoryGame = () => {
    const {
        cards,
        flippedCards,
        setFlippedCards,
        moves,
        setMoves,
        matches,
        setMatches,
        timer,
        setTimer,
        resetGame
    } = useGameState()
    const [matchedCards, setMatchedCards] = useState([]);
    const [gameWon, setGameWon] = useState(false)

    const handleClick = (id) => {
        console.log(`Card clicked: ${id}`);

        if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) return;

        const newFlippedCards = [...flippedCards, id];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoves((prevMoves) => prevMoves + 1);
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = cards.find(card => card.id === firstCardId);
            const secondCard = cards.find(card => card.id === secondCardId);
            if (firstCard.value === secondCard.value) {
                setMatches((prevMatches) => prevMatches + 1);
                setMatchedCards((prev) => [...prev, firstCardId, secondCardId]);
                setFlippedCards([]);
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    const isGameWon = matches === cards.length / 2;
    useEffect(() => {
        if (isGameWon && !gameWon) {
            setGameWon(true);
        }
    }, [isGameWon, gameWon]);

    return (
        <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-white text-3xl font-bold mb-4">Memory Game</div>

            <div className="grid grid-cols-4 gap-4 mb-6">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        value={card.value}
                        isFlipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
                        onClick={() => handleClick(card.id)}
                    />
                ))}
            </div>

            <div className="text-white text-xl mb-4">
                <p>Moves: {moves}</p>
                <p>Matches: {matches}</p>
                <p>Time: {timer}s</p>
            </div>

            {isGameWon && <p className="text-green-500 text-2xl font-bold">You Win! Time: {timer}s</p>}

            <button
                onClick={resetGame}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
            >
                Restart Game
            </button>
        </div>
    )
}
