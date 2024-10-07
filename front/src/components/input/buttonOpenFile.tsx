import React, { useRef } from 'react';
import toast from 'react-hot-toast'; 

const ButtonOpenFile: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Construct the file path (Note: This will not work directly as browsers do not allow access to full paths for security reasons)
      const filePath = file.name; // Only getting the file name

      // Send file path to the backend
      const response = await fetch('/api/upload-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath }),
      });

      if (response.ok) {
        toast.success('File path sent successfully!');
      } else {
        toast.error('Failed to send file path.');
      }
    }
  };

  const triggerFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-lg">
      <button
        onClick={triggerFileDialog}
        className="bg-accent text-background py-2 px-6 rounded-lg shadow-lg hover:bg-accent-dark"
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
