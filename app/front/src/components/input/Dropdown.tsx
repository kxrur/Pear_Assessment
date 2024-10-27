import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Define the Team interface
interface Team {
    id: number;
    teamName: string;
}

// TeamDropdown component
const TeamDropdown: React.FC<{
    teams: Team[];
    selectedTeam: string;
    onTeamChange: (teamName: string) => void;
}> = ({ teams, selectedTeam, onTeamChange }) => {
    return (
        <select
            value={selectedTeam}
            onChange={(e) => onTeamChange(e.target.value)} // Call the handler when value changes
            className="border border-gray-300 rounded p-1 bg-gray-200 text-black"
        >
            <option value="" disabled>Select Team</option>
            {/* Dynamically render all available teams from the teams array */}
            {teams.map((team) => (
                <option key={team.id} value={team.teamName}>
                    {team.teamName}
                </option>
            ))}
        </select>
    );
};

// Parent component
const TeamSelection: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulating fetching teams with mock data
        const fetchTeamsData = async () => {
            try {
                // Mocking a fetch call with hardcoded data
                const mockData: Team[] = [
                    { id: 1, teamName: 'Team Alpha' },
                    { id: 2, teamName: 'Team Beta' },
                    { id: 3, teamName: 'Team Gamma' },
                ];

                // Simulating network delay
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Set the teams state with mock data
                setTeams(mockData);
            } catch (error) {
                toast.error('Error fetching teams');
            } finally {
                setLoading(false);
            }
        };

        fetchTeamsData();
    }, []);

    const handleTeamChange = (teamName: string) => {
        setSelectedTeam(teamName); // Update selected team
    };

    return (
        <div
            className="flex flex-col items-center p-3 max-w-sm rounded-lg shadow-lg"
            style={{ backgroundColor: '#d3b58d' }} // Correct inline style
        >
            <h1 className="mb-2 text-lg font-bold">Select a Team</h1>
            {loading ? (
                <p className="text-highlight">Loading teams...</p>
            ) : (
                <>
                    <TeamDropdown
                        teams={teams}
                        selectedTeam={selectedTeam}
                        onTeamChange={handleTeamChange}
                    />
                    {selectedTeam && (
                        <p className="mt-2">You have selected: <strong>{selectedTeam}</strong></p>
                    )}
                </>
            )}
        </div>
    );
};

export default TeamSelection;