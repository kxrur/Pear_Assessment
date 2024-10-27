import { useEffect } from 'react';
import { TeamPreview } from '@c/ui/TeamPreview'; // Adjust the import path as needed
import { NavigateButton } from '@c/input/NavigateButton';
import { useAppDispatch, useAppSelector } from '@s/store';
import { fetchTeams } from '@s/allTeamsSlice';



export default function TeamView() {
  const dispatch = useAppDispatch();
  const teamsState = useAppSelector((state) => state.allTeams)
  const userId = useAppSelector((state) => state.user.id);


  useEffect(() => {
    dispatch(fetchTeams(userId || 0))
  }, [dispatch, userId])
  const teams = teamsState.allTeams;


  return (
    <div className="p-6">
      <NavigateButton text={'Create New Team'} path={'/create-team'}></NavigateButton>

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

