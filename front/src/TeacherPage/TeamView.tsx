// TeamView.tsx
import React from 'react';
import { TeamPreview } from '../components/ui/TeamPreview'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

export interface Team {
  professorId: string;
  teamName: string;
  teamMembers: string[];
  teamDescription: string; 
}

interface TeamViewProps {
  teams: Team[];
}

export const TeamView: React.FC<TeamViewProps> = ({ teams }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/create-team')}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create New Team
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {teams.map((team, index) => (
          <TeamPreview
            key={index}
            teamName={team.teamName}
            teamMembers={team.teamMembers}
            teamDescription={team.teamDescription}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamView;