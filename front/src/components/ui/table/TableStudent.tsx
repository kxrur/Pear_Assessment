import React from 'react';
import { Student, Team } from '@t/types';
interface TableStudentProps {
  students: Student[]; // Array of Student objects
  teams: Team[]; // Array of Team objects
  searchTerm: string; // Search term for filtering
}

const TableStudent: React.FC<TableStudentProps> = ({ students, teams, searchTerm }) => {
  // Filter students based on the search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.includes(searchTerm)
  );

  // Function to handle team selection
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>, studentId: number) => {
    const selectedTeamName = e.target.value;

    // Find the student being updated
    const updatedStudent = students.find(student => student.id === studentId);

    if (updatedStudent) {
      // Check if the team already exists
      const selectedTeam = teams.find(team => team.teamName === selectedTeamName);

      if (selectedTeam && !selectedTeam.teamMembers.includes(updatedStudent.name)) {
        // Add the student to the team members if they are not already included
        selectedTeam.teamMembers.push(updatedStudent.name);
        // Update the student's team name
        updatedStudent.teamName = selectedTeamName; // Set the selected team name

        // Here you could trigger an API call or a state update to persist the changes
        console.log(`Student ${updatedStudent.name} assigned to ${selectedTeamName}`);
      }
    }
  };

  return (
    <div className="p-4 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Student Management</h2>

      <table className="min-w-full bg-gray-100 border">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">ID</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Student Name</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Student ID</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Team Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.studentId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <select
                  value={student.teamName || ''}
                  onChange={(e) => handleTeamChange(e, student.id)}
                  className="p-2 border border-gray-300 rounded bg-gray-200 text-black"
                >
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                    <option key={team.teamName} value={team.teamName}>
                      {team.teamName}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableStudent;
