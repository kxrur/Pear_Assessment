import React from 'react';

interface TeamDropdownProps {
    teams: { id: number; teamName: string }[];
    selectedTeam: string;
    onTeamChange: (teamName: string) => void;
}

const TeamDropdown: React.FC<TeamDropdownProps> = ({ teams, selectedTeam, onTeamChange }) => {
    return (
        <select
            value={selectedTeam}
            onChange={(e) => onTeamChange(e.target.value)} // Call the handler when value changes
            className="border border-gray-300 rounded p-1 bg-gray-200 text-black"
        >
            <option value="">Select Team</option>
            {/* Dynamically render all available teams from the teams array */}
            {teams.map((team) => (
                <option key={team.id} value={team.teamName}>
                    {team.teamName}
                </option>
            ))}
        </select>
    );
};

export default TeamDropdown;