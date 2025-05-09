import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Added navigate
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TeacherRegFormData } from "@t/types";
import { registerTeacher } from "@s/userSlice";
import { useAppDispatch, useAppSelector } from "@s/store";


interface FormDataError {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm: React.FC = () => {
  const currentUser = useAppSelector((state) => state.user);
  useEffect(() => {
    toast.success("Welcome " + currentUser.firstName + " " + currentUser.lastName);
  }, [currentUser]);

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<TeacherRegFormData>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    roles: ["PROFESSOR"]
  });

  const navigate = useNavigate(); // Added navigate

  const [errors, setErrors] = useState<Partial<FormDataError>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input change
  };

  const validateForm = () => {
    const newErrors: Partial<FormDataError> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 7) {
      newErrors.password = "Password must be at least 7 characters long";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must contain at least one digit";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one special character";
    } else if (!/\w/.test(formData.password)) {
      newErrors.password = "Password must contain at least one word character";
    }

    // Validate confirm password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill all required fields correctly!");
    } else {
      console.log("Form Data: ", formData);
      await dispatch(registerTeacher(formData));
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
        <h2 className="text-background text-3xl font-semibold mb-6">Teacher Registration</h2>
        <form className="w-2/3 max-w-md" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">First Name{' '}
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full p-2 border-2 ${errors.firstName ? "border-red-500" : "border-highlight"} rounded`}
                placeholder="First Name"
              />
            </label>
            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">Last Name{' '}
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full p-2 border-2 ${errors.lastName ? "border-red-500" : "border-highlight"} rounded`}
                placeholder="Last Name"
              />
            </label>
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">Username{' '}
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full p-2 border-2 ${errors.username ? "border-red-500" : "border-highlight"} rounded`}
                placeholder="Username"
              />
            </label>
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">Password{' '}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-2 border-2 ${errors.password ? "border-red-500" : "border-highlight"} rounded`}
                placeholder="Password"
              />
            </label>
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm text-highlight mb-2">Confirm Password{' '}
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full p-2 border-2 ${errors.confirmPassword ? "border-red-500" : "border-highlight"} rounded`}
                placeholder="Confirm Password"
              />
            </label>
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mb-4">
            <button
              type="button"
              className="bg-background text-accent px-4 py-2 rounded w-1/2 mr-2"
              onClick={() => navigate('/teacher')} // Added navigate for Teacher button
            >
              Teacher
            </button>
            <button
              type="button"
              className="bg-background text-accent px-4 py-2 rounded w-1/2"
              onClick={() => navigate('/student')} // Added navigate for Student button
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

export default RegistrationForm;
