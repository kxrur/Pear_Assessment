import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-red-700 text-white h-screen p-6">
      <h1 className="text-2xl font-semibold mb-10">Monaco Peer Assessment</h1>
      <ul>
        <li className="mb-4 hover:text-gray-200 cursor-pointer">Dashboard</li>
        <li className="mb-4 hover:text-gray-200 cursor-pointer">Session Management</li>
        <li className="mb-4 hover:text-gray-200 cursor-pointer">Class Management</li>
        <li className="mb-4 hover:text-gray-200 cursor-pointer">Student Management</li>
        <li className="mb-4 hover:text-gray-200 cursor-pointer">SMS Management</li>
        <li className="mb-4 hover:text-gray-200 cursor-pointer">General Settings</li>
        <li className="mb-4 hover:text-gray-200 cursor-pointer">Switch Account</li>
        <li className="mb-4 hover:text-gray-200 cursor-pointer">Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
