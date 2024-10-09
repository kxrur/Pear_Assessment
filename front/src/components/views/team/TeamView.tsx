import React from 'react';
import { TeamPreview } from '../../ui/TeamPreview';

interface Team {
  teamName: string;
  teamMembers: string[];
  teamDescription: string;
}

interface TeamViewProps {
  teams: Team[];
}

export const TeamView: React.FC<TeamViewProps> = ({ teams }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {teams.map((team, index) => (
        <TeamPreview
          key={index}
          teamName={team.teamName}
          teamMembers={team.teamMembers}
          teamDescription={team.teamDescription}
        />
      ))}
    </div>
  );
};
