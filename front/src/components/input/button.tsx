// src/components/RoleButton.tsx
import React from 'react';

type RoleButtonProps = {
  role: 'teacher' | 'student';
  handleClick: (role: 'teacher' | 'student') => void;
};

const RoleButton: React.FC<RoleButtonProps> = ({ role, handleClick }) => {
  const buttonLabel = role === 'teacher' ? 'Teacher' : 'Student';

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#A52A2A',  // Brown background
    color: '#F2EBE2',            // Light cream text
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    margin: '5px',
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
      onClick={() => handleClick(role)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {buttonLabel}
    </button>
  );
};

export default RoleButton;
