import { selectTeamById } from '@s/allTeamsSlice';
import { RootState, useAppDispatch, useAppSelector } from '@s/store';
import { updateTeamFromAllTeams } from '@s/teamSlice';
import React from 'react';
import { useNavigate } from 'react-router-dom';


interface TeamProps {
  teamId: number;
  teamName: string;
  teamMembers: string[];
  teamDescription: string;
}

export const TeamPreview: React.FC<TeamProps> = ({
  teamId,
  teamName,
  teamMembers,
  teamDescription,
}) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedTeam = useAppSelector((state) => selectTeamById(state, teamId))

  function handleTeamSelect() {
    dispatch(updateTeamFromAllTeams(selectedTeam));
    navigate('/select-teammate')
  }
  return (

    <div className="flex flex-col items-center p-6 bg-secondary max-w-xl rounded-lg shadow-lg" onClick={handleTeamSelect}>
      <h1 className="text-4xl font-bold text-background mb-6">{teamName}</h1>
      <div className="flex flex-row space-x-4 h-full max-w-xl ">
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
        <div className="w-3/4 bg-accent p-4 rounded-lg ">
          <p className="text-highlight text-ellipsis overflow-hidden line-clamp-6">
            {teamDescription}
          </p>
        </div>
      </div>
    </div>

  );
};
