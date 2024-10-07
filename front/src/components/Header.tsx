import React from 'react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex justify-between items-center bg-red-700 p-4 text-white">
      <div className="w-1/3">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={onSearchChange}
          className="p-2 w-full rounded-sm text-black bg-gray-300 placeholder-gray-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <span>Account</span>
        <div className="cursor-pointer">Admin ⬇</div>
      </div>
    </div>
  );
};

export default Header;
