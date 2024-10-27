
import React from 'react';
import { TeamPreviewDelete } from '@c/ui/TeamPreviewDelete';
import { useAppDispatch, useAppSelector } from '@s/store';


export default function TeamViewDeletenewFunction() {

  const dispatch = useAppDispatch();
  const teamsState = useAppSelector((state) => state.allTeams)
  const userId = useAppSelector((state) => state.user.id);

  const teams = teamsState.allTeams;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {teams.map((team, index) => (
        <TeamPreviewDelete
          key={index}
          teamName={team.teamName}
          teamMembers={team.students.map((student) => student.name)}
          teamDescription={team.teamDescription} />
      ))}
    </div>
  );
}
