import React, { useState } from 'react';

interface UserInputProps {
    type: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    error?: string;
    required?: boolean;
  }
  


function UserInput(props: UserInputProps){
    // Object Dstructuring (no need to use props. each time)
    const { type, value, onChange, label, error, required } = props;

    // Add state to control password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    // Toggle visibility of password
    function togglePasswordVisibility(){
        setIsPasswordVisible(!isPasswordVisible);
    }

    // Determine input type (toggle between 'password' and 'text')
    const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

    return(
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
            <input
        type={inputType}
        value={value}
        onChange = {onChange}
        required={required}
        className={`mt-1 block w-full px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      />
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
    )
}


export default UserInput;
