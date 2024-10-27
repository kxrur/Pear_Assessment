import { useEffect } from 'react';
import { TeamPreview } from '@c/ui/TeamPreview'; // Adjust the import path as needed
import { NavigateButton } from '@c/input/NavigateButton';
import { useAppDispatch, useAppSelector } from '@s/store';
import { fetchTeams } from '@s/allTeamsSlice';
import TeamsControlButtons from '@c/ui/team/TeamsControlButtons';



export default function TeamView() {
  const dispatch = useAppDispatch();
  const teamsState = useAppSelector((state) => state.allTeams)
  const userType = useAppSelector((state) => state.user.roles);
  const userId = useAppSelector((state) => state.user.id);
  const teams = teamsState.allTeams;


  useEffect(() => {
    dispatch(fetchTeams(userId || 0))
  }, [teamsState.allTeams, userId])


  return (
    <div className="p-6">
      {userType.includes("PROFESSOR") && (
        <TeamsControlButtons />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" >
        {teams.map((team, index) => (
          <TeamPreview
            key={index}
            teamId={team.id || -1}
            teamName={team.teamName}
            teamMembers={team.students.map((student) => student.name)}
            teamDescription={team.teamDescription}
          />
        ))}
      </div>
    </div>
  );
};

