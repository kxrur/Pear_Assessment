import React, { useState } from 'react';

// Import all six dice images
import die1 from '@a/dice/1.png';
import die2 from '@a/dice/2.png';
import die3 from '@a/dice/3.png';
import die4 from '@a/dice/4.png';
import die5 from '@a/dice/5.png';
import die6 from '@a/dice/6.png';
import def from '@a/dice/default.gif'; // Default GIF for initial state

const diceImages = [die1, die2, die3, die4, die5, die6];

interface DiceRollerProps {
  onRoll: (result: number) => void; // Function that takes the result and passes it back
}

const DiceRoller: React.FC<DiceRollerProps> = ({ onRoll }) => {
  const [diceResult, setDiceResult] = useState<number | null>(null); // Start with null to indicate no roll yet
  const [isRolling, setIsRolling] = useState<boolean>(false); // State to track if dice is rolling

  const rollDice = () => {
    setIsRolling(true); // Set rolling state to true
    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1;
      setDiceResult(result);
      onRoll(result); // Pass the result back to the parent
      setIsRolling(false); // Set rolling state to false after the roll is completed
    }, 500); // Simulate a 500ms delay to show the rolling animation
  };

  return (
    <div className="flex flex-col items-center">
      {/* Show default gif while rolling, otherwise show the dice result */}
      <img
        src={isRolling ? def : diceResult ? diceImages[diceResult - 1] : def} 
        alt={`Die result: ${diceResult ?? 'rolling'}`}
        className="w-16 h-16"
      />
      <button
        className="px-4 py-2 mt-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none"
        onClick={rollDice}
        disabled={isRolling} // Disable the button while rolling
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default DiceRoller;
