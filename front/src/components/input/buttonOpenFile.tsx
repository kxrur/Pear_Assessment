import React, { useRef } from 'react';
import toast from 'react-hot-toast'; // Ensure this is installed

const ButtonOpenFile: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'text/csv') {
        // Simulate file saving
        const fileName = `/src/resources/${file.name}`;
        toast.success(`File uploaded successfully: ${fileName}`);
      } else {
        toast.error('Invalid file type. Please upload a .csv file.');
      }
    }
  };

  const triggerFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-lg"> {/* Removed bg-secondary */}
      <button
        onClick={triggerFileDialog}
        className="bg-accent text-background py-2 px-6 rounded-lg shadow-lg hover:bg-accent-dark" // Button styling remains
      >
        Upload CSV
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ButtonOpenFile;
