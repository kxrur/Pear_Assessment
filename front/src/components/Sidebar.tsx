import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-red-700 text-white h-screen p-6">
      <h1 className="text-2xl font-semibold mb-10">Monaco Peer Assessment</h1>
      <ul>
        <li className="mb-4">
          <Link 
            to="/dashboard" 
            className="block px-4 py-2 text-white hover:bg-gray-300 hover:text-black rounded transition duration-200 cursor-pointer"
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link 
            to="/teamview" 
            className="block px-4 py-2 text-white hover:bg-gray-300 hover:text-black rounded transition duration-200 cursor-pointer"
          >
            TeamView
          </Link>
        </li>
        <li className="mb-4">
          <Link 
            to="/student-management" 
            className="block px-4 py-2 text-white hover:bg-gray-300 hover:text-black rounded transition duration-200 cursor-pointer"
          >
            Student Management
          </Link>
        </li>
        <li className="mb-4">
          <Link 
            to="/sms-management" 
            className="block px-4 py-2 text-white hover:bg-gray-300 hover:text-black rounded transition duration-200 cursor-pointer"
          >
            SMS Management
          </Link>
        </li>
        <li className="mb-4">
          <Link 
            to="/settings" 
            className="block px-4 py-2 text-white hover:bg-gray-300 hover:text-black rounded transition duration-200 cursor-pointer"
          >
            General Settings
          </Link>
        </li>
        <li className="mb-4">
          <Link 
            to="/begin" 
            className="block px-4 py-2 text-white hover:bg-gray-300 hover:text-black rounded transition duration-200 cursor-pointer"
          >
            Switch Account
          </Link>
        </li>
        <li className="mb-4">
          <Link 
            to="/begin" 
            className="block px-4 py-2 text-white hover:bg-gray-300 hover:text-black rounded transition duration-200 cursor-pointer"
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
