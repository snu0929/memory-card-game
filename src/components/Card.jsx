import React from 'react';

export const Card = ({ value, id, isFlipped, onClick }) => {
    return (
        <div
            className={`w-20 h-20 bg-gray-900 rounded-lg cursor-pointer flex items-center justify-center ${isFlipped ? 'bg-blue-500' : ''
                }`}
            onClick={() => onClick(id)}
        >
            {isFlipped && (
                <span className="text-white text-4xl text-center font-semibold">{value}</span>
            )}
        </div>
    );
};
