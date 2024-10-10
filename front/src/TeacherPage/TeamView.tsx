// TeacherPage/TeamView.tsx
import React, { useState } from 'react';
import { TeamPreview } from '../components/ui/TeamPreview';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Define the Team interface
interface Team {
  teamName: string;
  teamMembers: string[];
  teamDescription: string;
}

interface TeamViewProps {
  teams: Team[];
  addTeam: (team: Team) => void; // Function to add a new team
}

const TeamView: React.FC<TeamViewProps> = ({ teams, addTeam }) => {
  const [showForm, setShowForm] = useState(false);
  const [newTeam, setNewTeam] = useState<Team>({
    teamName: '',
    teamMembers: [''], // Start with one empty member
    teamDescription: '',
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof Team) => {
    setNewTeam({ ...newTeam, [key]: e.target.value });
  };

  // Add a new member input field
  const handleAddMember = () => {
    setNewTeam({ ...newTeam, teamMembers: [...newTeam.teamMembers, ''] });
  };

  // Handle changes to existing members
  const handleMemberChange = (index: number, value: string) => {
    const updatedMembers = [...newTeam.teamMembers];
    updatedMembers[index] = value;
    setNewTeam({ ...newTeam, teamMembers: updatedMembers });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTeam(newTeam); // Call the function to add the new team
    setNewTeam({ teamName: '', teamMembers: [''], teamDescription: '' }); // Reset the form
    setShowForm(false); // Hide the form after submission
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Render Sidebar */}
      <div className="flex-1">
        <Header searchTerm={''} onSearchChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /> {/* Render Header */}
        <div className="p-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showForm ? 'Cancel' : 'Create New Team'}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-4">
              <input
                type="text"
                placeholder="Team Name"
                value={newTeam.teamName}
                onChange={(e) => handleInputChange(e, 'teamName')}
                className="p-2 border border-gray-300 rounded mb-2 w-full"
                required
              />
              <textarea
                placeholder="Team Description"
                value={newTeam.teamDescription}
                onChange={(e) => handleInputChange(e, 'teamDescription')}
                className="p-2 border border-gray-300 rounded mb-2 w-full"
                required
              />
              <div className="mb-2">
                <h3 className="font-semibold">Team Members:</h3>
                {newTeam.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      placeholder={`Member ${index + 1}`}
                      value={member}
                      onChange={(e) => handleMemberChange(index, e.target.value)}
                      className="p-2 border border-gray-300 rounded w-full"
                      required
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="text-blue-600 hover:underline"
                >
                  + Add Another Member
                </button>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Create Team
              </button>
            </form>
          )}

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
      </div>
    </div>
  );
};

export default TeamView;
