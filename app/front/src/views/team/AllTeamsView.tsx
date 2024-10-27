import { TeamPreview } from '@c/ui/TeamPreview.tsx'; // Adjust the import path as needed
import { NavigateButton } from '@c/input/NavigateButton.tsx';
import { Team } from '@t/types.ts';


interface TeamViewProps {
  teams: Team[];
}

export default function TeamView({ teams }: TeamViewProps) {
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

