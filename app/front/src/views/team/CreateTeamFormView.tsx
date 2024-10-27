import { Team } from '@t/types.ts';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInput from '@c/input/UserInput.tsx';
import Button from '@c/input/Button.tsx';
import { addTeam } from '@f/teams.ts';




export default function CreateTeamForm() {
  const navigate = useNavigate();
  const [newTeam, setNewTeam] = useState({
    teacherId: '',
    teamName: '',
    studentIds: [''],
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
      professorId: newTeam.teacherId,
      teamName: newTeam.teamName,
      teamMembers: newTeam.studentIds.map(id => id),
      teamDescription: newTeam.teamDescription
    };

    addTeam(teamDTO);
    navigate('/team-preview'); // Redirect to the team preview page after submission
  };

  return (
    <div className="p-6 bg-accent h-full">
      <form onSubmit={handleSubmit} className="mb-4">
        {/* Use UserInput for all inputs */}
        <UserInput
          type="number"
          min={0}
          value={newTeam.teacherId}
          onChange={(e) => handleInputChange(e, 'teacherId')}
          required={true}
          placeholder="Teacher ID"
          label="Teacher ID"
        />

        <UserInput
          type="text"
          value={newTeam.teamName}
          onChange={(e) => handleInputChange(e, 'teamName')}
          required={true}
          placeholder="Team Name"
          label="Team Name"
        />

        <UserInput
          type="textarea"
          value={newTeam.teamDescription}
          onChange={(e) => handleInputChange(e, 'teamDescription')}
          required={true}
          label='Team Description'
          placeholder="Team Description"
        />

        <div className="mb-2">
          <h3 className="font-semibold text-highlight">Student IDs:</h3>
          {newTeam.studentIds.map((studentId, index) => (
            <div key={index} className="flex items-center ">
              <UserInput
                type="number"
                min={0}
                value={studentId}
                onChange={(e) => handleStudentIdChange(index, e.target.value)}
                required={true}
                placeholder={`Student ID ${index + 1}`}
              //label={`Student ID ${index + 1}`}
              />
            </div>
          ))}
          <Button text={'Add Another Student'} handleClick={handleAddStudent}></Button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Team
        </button>
      </form>
    </div >
  );
};

