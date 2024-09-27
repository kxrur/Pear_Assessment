// ./components/views/login-teacher.tsx

import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const LoginTeacher: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validationErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      validationErrors.username = "Username is required";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill all required fields correctly!");
    } else {
      toast.success("Login successful!");
    }
    const url = new URLSearchParams();
    url.append('username', username);
        url.append('password', password);
        console.log(url);
      try{
        const response = await fetch( 'http://localhost:8080/api/login/professor',{
          method: 'POST',
               headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
               },
          body:url.toString(),
        });
        if (response.ok) {
          const responseData = await response.text();
          setMessage(responseData); // Message from the backend
        } else if (response.status === 401) {
          setMessage('Invalid credentials');
        } else {
          setMessage('An error occurred. Please try again.');
        }
      } catch (error) {
        setMessage('Failed to connect to the server.');
      }
  };

  return (
    <div className="flex h-screen">
      {/* Left side (Monaco Logo and Image) */}
      <div className="w-1/3 bg-background flex flex-col justify-center items-center">
        <h1 className="text-accent text-5xl font-bold mb-10">Monaco</h1>
        <div className="bg-accent p-8 rounded-full">
          <img src="/path-to-image.svg" alt="Logo" className="h-40 w-40" />
        </div>
      </div>

      {/* Right side (Form) */}
      <div className="w-2/3 bg-accent flex flex-col justify-center items-center">
        <h2 className="text-background text-3xl font-semibold mb-6">Teacher Login</h2>
        <form className="w-2/3 max-w-md" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                const value = e.target.value;
               
                setUsername(value);
              }}
              className={`w-full p-2 border-2 ${errors.username ? "border-red-500" : "border-highlight"} rounded`}
              placeholder="Enter your Username"
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
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
                toast.info("Already on Teacher Login.");
              }}
            >
              Teacher
            </button>
            <button
              type="button"
              className="bg-background text-accent px-4 py-2 rounded w-1/2"
              onClick={() => {
                // Handle Student button logic
                toast.info("Redirecting to Student Login...");
                console.log("Student button clicked");
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

export default LoginTeacher;
