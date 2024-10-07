import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Team {
  id: number;
  name: string;
}

const TeamDropdown: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Constant variable for an example team, that is shown when no teams are returned from backend
  const EXAMPLE_TEAM: Team = { id: 0, name: 'Monaco' }; // Placeholder team

  useEffect(() => {
    // Fetch existing teams from the backend
    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/teams'); 
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        toast.error('Error fetching teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(Number(event.target.value));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-secondary max-w-xl rounded-lg shadow-lg">
      <label className="text-background mb-2" htmlFor="team-select">Select Team:</label>
      {loading ? (
        <p className="text-highlight">Loading teams...</p>
      ) : (
        <select
          id="team-select"
          value={selectedTeam !== null ? selectedTeam : ''}
          onChange={handleSelectChange}
          className="bg-accent text-background py-2 px-4 rounded-lg shadow-lg hover:bg-accent-dark"
        >
          <option value="" disabled>Select a team</option>
          {teams.length === 0 ? (
            <option value={EXAMPLE_TEAM.id} className="text-highlight">
              {EXAMPLE_TEAM.name} (No teams available)
            </option>
          ) : (
            teams.map((team) => (
              <option key={team.id} value={team.id} className="text-highlight">
                {team.name}
              </option>
            ))
          )}
        </select>
      )}
    </div>
  );
};

export default TeamDropdown;
