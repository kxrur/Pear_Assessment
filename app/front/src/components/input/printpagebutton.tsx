import React from 'react';

// Define the interface for the component's props
interface PrintButtonProps {
  text?: string; // Optional text for the button
  className?: string; // Additional Tailwind CSS classes for styling
  onBeforePrint?: () => void; // Optional callback before printing
}

const PrintButton: React.FC<PrintButtonProps> = ({
  text = 'Print Page', // Default text
  className = '', // Default to an empty string if no additional classes are provided
  onBeforePrint, // Optional callback function before print
}) => {
  // Function to handle printing the page
  const handlePrint = () => {
    if (onBeforePrint) {
      onBeforePrint(); // Call the callback function before printing if provided
    }
    window.print(); // Trigger the print dialog
  };

  return (
    <button
      onClick={handlePrint}
      className={`bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 ${className}`}
    >
      {text}
    </button>
  );
};

export default PrintButton;