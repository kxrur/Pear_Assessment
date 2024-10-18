import React, { useRef } from 'react';
import toast from 'react-hot-toast';

const ButtonOpenFile: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append('file', file);  // 'file' should match the backend @RequestParam("file")

            try {
                // Send the file to the backend
                const response = await fetch('http://localhost:8080/api/upload/students', {
                    method: 'POST',
                    body: formData,  // Send FormData object
                });

                if (response.ok) {
                    toast.success('File uploaded successfully!');
                } else {
                    toast.error('Failed to upload file.');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                toast.error('Failed to upload file.');
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
                className="bg-accent text-background py-2 px-6 rounded-lg shadow-lg hover:bg-accent-dark">
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
