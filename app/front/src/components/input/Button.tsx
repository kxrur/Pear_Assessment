import React from 'react';

type ButtonProps = {
  text: string;
  handleClick: () => void;
};

export default function Button({ text, handleClick }: ButtonProps) {

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#A52A2A',  // Brown background
    color: '#F2EBE2',            // Light cream text
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',         // Rounded corners
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '1px',        // Space between letters
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',  // Subtle shadow for effect
    transition: 'background-color 0.3s ease',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#8B0000'; // Darken on hover
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#A52A2A'; // Reset color
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </button>
  );
};



