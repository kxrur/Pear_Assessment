import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search"
        className="bg-gray-200 text-black placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" // Apply light grey background and white text
      />
    </div>
  );
};

export default SearchBar;
