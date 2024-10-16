import { SidebarItem } from '@t/types';
import React from 'react';
import { Link } from 'react-router-dom';


interface SidebarProps {
  items: SidebarItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  return (
    <div className="w-64 bg-background text-white h-screen p-6">
      <h1 className="text-2xl font-semibold mb-10">Monaco Peer Assessment</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-4">
            <Link
              to={item.to}
              onClick={item.onClick}
              className="block px-4 py-2 text-white hover:bg-gray-300 hover:text-black rounded transition duration-200 cursor-pointer"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

