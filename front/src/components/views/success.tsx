import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Success: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    toast.info("Redirecting to the home page...");
    navigate('/');  // Redirect to home or another page as needed
  };

  return (
    <div className="flex h-screen">
      {/* Left side (Monaco Logo and Image) */}
      <div className="w-1/3 bg-background flex flex-col justify-center items-center">
        <h1 className="text-accent text-5xl font-bold mb-10">Monaco</h1>
        <img src="src/assets/logo.png" alt="Logo" className="h-300 w-80" />
      </div>

      {/* Right side (Success Message) */}
      <div className="w-2/3 bg-accent flex flex-col justify-center items-center">
        <h2 className="text-background text-3xl font-semibold mb-6">Login Successful!</h2>
        <p className="text-background text-lg mb-6">Welcome! You have successfully logged in.</p>

        <button
          onClick={() => navigate('/student')}
          className="bg-background text-accent px-6 py-2 rounded w-full max-w-md"
        >
          Go to Home
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Success;