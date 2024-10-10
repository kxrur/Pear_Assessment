import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Team } from './TeamView';

interface CreateTeamFormProps {}

async function addTeam(team: Team) {
  try {

    // Make the POST request to your Spring Boot backend
    const response = await fetch('http://localhost:8080/api/teams/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        professorID: team.professorId,   // Match backend DTO field
        teamName: team.teamName,
        studentIDs: team.teamMembers    // Match backend DTO field
      })
    });

    if (response.ok) {
      console.log('Team was created successfully:');
    } else {
      // If the request fails, handle the error case
      console.error('Failed to create team:', response.statusText);
    }
  } catch (error) {
    console.error('Error occurred while creating team:', error);
  }
}


export const CreateTeamForm: React.FC<CreateTeamFormProps> = () => {
  const navigate = useNavigate();
  const [newTeam, setNewTeam] = useState({
    teacherId: '', // Add teacherId as a number field
    teamName: '',
    studentIds: [''], // Storing student IDs instead of names
    teamDescription: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setNewTeam({ ...newTeam, [key]: e.target.value });
  };

  const handleAddStudent = () => {
    setNewTeam({ ...newTeam, studentIds: [...newTeam.studentIds, ''] });
  };

  const handleStudentIdChange = (index: number, value: string) => {
    const updatedStudentIds = [...newTeam.studentIds];
    updatedStudentIds[index] = value;
    setNewTeam({ ...newTeam, studentIds: updatedStudentIds });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const teamDTO: Team = {
      professorId:newTeam.teacherId,               // Convert to number
      teamName: newTeam.teamName,
      teamMembers: newTeam.studentIds.map(id => id), // Convert each to number
      teamDescription: newTeam.teamDescription
    };
  
    addTeam(teamDTO); // Call the function to add the new team
    navigate('/team-preview'); // Redirect to the team preview page after submission
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="number"
          placeholder="Teacher ID"
          value={newTeam.teacherId}
          onChange={(e) => handleInputChange(e, 'teacherId')}
          className="p-2 border border-gray-300 rounded mb-2 w-full"
          required
        />
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
          <h3 className="font-semibold">Student IDs:</h3>
          {newTeam.studentIds.map((studentId, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="number"
                placeholder={`Student ID ${index + 1}`}
                value={studentId}
                onChange={(e) => handleStudentIdChange(index, e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddStudent}
            className="text-blue-600 hover:underline"
          >
            + Add Another Student
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Team
        </button>
      </form>
    </div>
  );
};

export default CreateTeamForm;
