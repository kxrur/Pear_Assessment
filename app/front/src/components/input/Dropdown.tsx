import { selectTeamNamesByStudentId } from '@s/allTeamsSlice';
import { useAppSelector } from '@s/store';
import React from 'react';


const TeamDropdown: React.FC<{
  teams: string[];
}> = ({ teams }) => {
  return (
    <select
      className="border border-gray-300 rounded p-1 bg-gray-200 text-black"
    >
      <option value="" disabled></option>
      {teams.map((team, index) => (
        <option key={index} value={team}>
          {team}
        </option>
      ))}
    </select>
  );
};

interface TeamSelectionProps {
  dbStudentId: number
}
// Parent component
export default function TeamSelection({ dbStudentId }: TeamSelectionProps) {

  let teams: string[] = useAppSelector((state) => selectTeamNamesByStudentId(state, dbStudentId))
  if (teams.length === 0) {
    teams = ["no team"]
  }


  return (
    <div
      className="flex flex-col items-center p-3 max-w-sm rounded-lg shadow-lg"
      style={{ backgroundColor: '#d3b58d' }} // Correct inline style
    >
      <>
        <TeamDropdown
          teams={teams} />
      </>
    </div>
  );
}

