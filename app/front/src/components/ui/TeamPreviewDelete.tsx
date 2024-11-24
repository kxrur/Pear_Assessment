import React, { useState } from 'react';

interface TeamProps {
  teamId: number;
  teamName: string;
  teamMembers: string[];
  teamDescription: string;
  onDelete: (teamId: number) => void;
}

export const TeamPreviewDelete: React.FC<TeamProps> = ({
  teamId,
  teamName,
  teamMembers,
  teamDescription,
  onDelete,
}) => {
  const [isWiggling, setIsWiggling] = useState(true);

  // Stop wiggle effect on hover
  const handleMouseEnter = () => {
    setIsWiggling(false);
  };

  // Resume wiggle effect when mouse leaves
  const handleMouseLeave = () => {
    setIsWiggling(true);
  };

  return (
    <div
      className={`relative flex flex-col items-center p-6 bg-secondary max-w-xl rounded-lg shadow-lg transition-transform duration-500 ${isWiggling ? 'animate-wiggle' : ''
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role='button'
      tabIndex={0}
    >
      {/* Delete button */}
      <button
        onClick={() => onDelete(teamId)}
        className="absolute top-1 right-1 bg-highlight text-white rounded-full w-10 h-10 flex items-center justify-center"
      >
        X
      </button>

      <h1 className="text-4xl font-bold text-background mb-6">{teamName}</h1>
      <div className="flex flex-row space-x-4 h-full max-w-xl">
        {/* Team Members List */}
        <div className="w-1/4 bg-accent p-4 rounded-lg overflow-auto">
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
        <div className="w-3/4 bg-accent p-4 rounded-lg">
          <p className="text-highlight text-ellipsis overflow-hidden line-clamp-6">
            {teamDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
