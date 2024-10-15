// TeamView.tsx
import React from 'react';
import { TeamPreview } from '@c/ui/TeamPreview'; // Adjust the import path as needed
import { NavigateButton } from '@c/input/NavigateButton';
import { Team } from '@t/types';


interface TeamViewProps {
  teams: Team[];
}

export const TeamView: React.FC<TeamViewProps> = ({ teams }) => {
  return (
    <div className="p-6">
      <NavigateButton text={'Create New Team'} path={'/create-team'}></NavigateButton>

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
