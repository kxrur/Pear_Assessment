import React from 'react';
import { sidebarItems } from '@t/SampleData';
import Sidebar from '@c/navBar/Sidebar';


interface TeamProps {
  teamName: string;
  teamMembers: string[];
  teamDescription: string;
}

export const TeamPreview: React.FC<TeamProps> = ({
  teamName,
  teamMembers,
  teamDescription,
}) => {
  return (
    
<div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 h-full fixed top-0 left-0  text-white">
        <Sidebar items={sidebarItems} />
      </div>
    <div className="flex flex-col items-center p-6 bg-secondary w-1/8 rounded-lg shadow-lg ">
      <h1 className="text-4xl font-bold text-background mb-6">{teamName}</h1>
      <div className="flex flex-row space-x-4 h-full max-w-xl ">
        {/* Team Members List */}
        <div className="w-1/8 bg-accent p-4 rounded-lg overflow-auto">
          {teamMembers.length ? (
            <ul className="space-y-2">
              {teamMembers.slice(0, 5).map((member, index) => (
                <li key={index} className="text-highlight">
                  {member}
                </li>
              ))}
              {teamMembers.length > 5 && (
                <li className="text-foreground">...</li>
              )}
            </ul>
          ) : (
            <p>No members available.</p>
          )}
        </div>
        {/* Team Description */}
        <div className="w-3/4 bg-accent p-4 rounded-lg ">
          <p className="text-highlight text-ellipsis overflow-hidden line-clamp-6">
            {teamDescription}
          </p>
        </div>
      </div>
    </div>
    </div>
   
  );
};
