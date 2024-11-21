import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "@s/store";
import { resetPassword } from "@s/userSlice";



export const StudentResetView: React.FC = () => {
  
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; newPassword?: string; confirmPassword?: string }>({});
  
  const navigate = useNavigate(); // Used for navigation

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      // Validation
      const validationErrors: { username?: string; newPassword?: string; confirmPassword?: string } = {};
  
      if (!username.trim()) validationErrors.username = "Username is required.";
      if (!newPassword.trim()) validationErrors.newPassword = "New password is required.";
      if (newPassword !== confirmPassword) validationErrors.confirmPassword = "Passwords do not match.";
  
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
  
      setErrors({}); // Clear any previous errors
  
      try {
        // Dispatch the async thunk to reset the password
        const result = await dispatch(
          resetPassword({ username, newPassword })
        ).unwrap(); // Unwrap to handle success or failure directly
  
        toast.success(result); // Display the API response message
        navigate("/welcome"); // Navigate to the login page after success
      } catch (error) {
        console.error("Reset password failed:", error);
        toast.error("boustan"); // Display error message
      }
  };

  return (
    <div className="flex h-screen">
      {/* Left side (Monaco Logo and Image) */}
      <div className="w-1/3 bg-background flex flex-col justify-center items-center">
        <h1 className="text-accent text-5xl font-bold mb-10">Monaco</h1>
        <img src="src/assets/logo.png" alt="Logo" className="h-300 w-80" />
      </div>

      {/* Right side (Form) */}
      <div className="w-2/3 bg-accent flex flex-col justify-center items-center">
        <h2 className="text-background text-3xl font-semibold mb-6">Reset Password</h2>
        <form className="w-2/3 max-w-md" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-2 border-2 ${errors.username ? "border-red-500" : "border-highlight"} rounded`}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full p-2 border-2 ${errors.newPassword ? "border-red-500" : "border-highlight"} rounded`}
              placeholder="Enter your new password"
            />
            {errors.newPassword && <p className="text-red-500 text-xs">{errors.newPassword}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-2 border-2 ${errors.confirmPassword ? "border-red-500" : "border-highlight"} rounded`}
              placeholder="Confirm your new password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-background text-accent px-6 py-2 rounded w-full"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentResetView;
