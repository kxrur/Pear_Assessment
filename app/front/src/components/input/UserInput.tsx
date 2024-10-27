import React, { useState } from 'react';

interface UserInputProps {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  min?: number;
  max?: number
}

function UserInput({
  type,
  value,
  onChange,
  label,
  error,
  required,
  placeholder,
  rows = 3,
  min,
  max,
}: UserInputProps) {

  // Add state to control password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Toggle visibility of password
  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  // Determine input type (toggle between 'password' and 'text')
  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  return (
    <div className="mb-2 relative">
      {label && <label className="block font-bold text-xl text-highlight ">{label}</label>}

      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows} // Pass the rows prop to textarea
          className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
      ) : (
        <input
          type={inputType}
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {/* Button to toggle password visibility */}
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        >
          {isPasswordVisible ? 'Hide' : 'Show'}
        </button>
      )}
    </div>
  );
}

export default UserInput;
