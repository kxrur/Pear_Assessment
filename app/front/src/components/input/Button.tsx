import React from 'react';

type ButtonProps = {
  text: string;
  handleClick: () => void;
  disabled?: boolean
};

export default function Button({ text, handleClick, disabled = false }: ButtonProps) {

  const buttonStyle: React.CSSProperties = {
    backgroundColor: disabled ? '#D3D3D3' : '#A52A2A',
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: '#F2EBE2',            // Light cream text
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',         // Rounded corners
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '1px',        // Space between letters
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',  // Subtle shadow for effect
    transition: 'background-color 0.3s ease',
  };

  const hoverStyle: React.CSSProperties = !disabled
    ? { backgroundColor: '#8B0000' }  // Darken on hover if not disabled
    : {};

  return (
    <button
      style={{ ...buttonStyle, ...hoverStyle }}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button >
  );
};



