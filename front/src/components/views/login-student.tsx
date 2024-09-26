// ./components/views/login-student.tsx

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const LoginStudent: React.FC = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ id?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validationErrors: { id?: string; password?: string } = {};

    if (!id.trim()) {
      validationErrors.id = "ID is required";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill all required fields correctly!");
    } else {
      console.log("Login Data: ", { id, password });
      toast.success("Login successful!");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side (Monaco Logo and Image) */}
      <div className="w-1/3 bg-background flex flex-col justify-center items-center">
        <h1 className="text-accent text-5xl font-bold mb-10">Monaco</h1>
        
          <img src="src/assets/figma/logo.png" alt="Logo" className="h-300 w-80" />
        
      </div>

      {/* Right side (Form) */}
      <div className="w-2/3 bg-accent flex flex-col justify-center items-center">
        <h2 className="text-background text-3xl font-semibold mb-6">Student Login</h2>
        <form className="w-2/3 max-w-md" onSubmit={handleSubmit}>
          {/* ID */}
          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => {
                const value = e.target.value;
                const numericValue = value.replace(/[^0-9]/g, ""); // Allow only numeric input
                setId(numericValue);
              }}
              className={`w-full p-2 border-2 ${errors.id ? "border-red-500" : "border-highlight"} rounded`}
              placeholder="Enter your ID"
            />
            {errors.id && <p className="text-red-500 text-xs">{errors.id}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border-2 ${errors.password ? "border-red-500" : "border-highlight"} rounded`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          {/* Buttons for Teacher and Student */}
          <div className="flex justify-between mb-4 w-full">
            <button
              type="button"
              className="bg-background text-accent px-4 py-2 rounded w-1/2 mr-2"
              onClick={() => {
                // Handle Teacher button logic
                toast.info("Redirecting to Teacher Login...");
                console.log("Teacher button clicked");
              }}
            >
              Teacher
            </button>
            <button
              type="button"
              className="bg-background text-accent px-4 py-2 rounded w-1/2"
              onClick={() => {
                // Handle Student button logic
                toast.info("Already on Student Login.");
              }}
            >
              Student
            </button>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-background text-accent px-6 py-2 rounded w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginStudent;
