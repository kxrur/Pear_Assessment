import React, { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  id: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    id: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
  };

  return (
    <div className="flex h-screen">
      {/* Left side (Monaco Logo and Image) */}
      <div className="w-1/3 bg-background flex flex-col justify-center items-center">
        <h1 className="text-accent text-5xl font-bold mb-10">Monaco</h1>
        <div className="bg-accent p-8 rounded-full">
          {/* Replace with your actual image path */}
          <img src="/path-to-image.svg" alt="Logo" className="h-40 w-40" />
        </div>
      </div>

      {/* Right side (Form) */}
      <div className="w-2/3 bg-accent flex flex-col justify-center items-center">
        <h2 className="text-background text-3xl font-semibold mb-6">User Registration</h2>
        <form className="w-2/3 max-w-md" onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-highlight rounded"
              placeholder="First Name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-highlight rounded"
              placeholder="Last Name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-highlight rounded"
              placeholder="ID"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-highlight rounded"
              placeholder="Username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-highlight rounded"
              placeholder="Password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-highlight rounded"
              placeholder="Confirm Password"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mb-4">
            <button
              type="button"
              className="bg-background text-accent px-4 py-2 rounded w-1/2 mr-2"
            >
              Teacher
            </button>
            <button
              type="button"
              className="bg-background text-accent px-4 py-2 rounded w-1/2"
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
    </div>
  );
};

export default RegistrationForm;
