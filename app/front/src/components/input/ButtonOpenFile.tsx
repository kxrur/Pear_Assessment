import { fetchCSVStudents } from '@s/allStudentsSlice';
import { useAppDispatch } from '@s/store';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ButtonOpenFile: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await dispatch(fetchCSVStudents(file))
      navigate("/table-student")
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
      <ToastContainer />
    </div>
  );
};

export default ButtonOpenFile;
