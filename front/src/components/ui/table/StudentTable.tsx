import React from 'react';
import StarRating from './StarRating';
import { Student } from '@t/types';

interface StudentTableProps {
  students: Student[];
  searchTerm: string;
  addStudent: (student: { name: string; studentId: string; teamName?: string; averageGrade: number }) => void;
  deleteStudent: (id: number) => void;
  teams: { id: number; teamName: string }[]; // Add teams prop to the component
}

const StudentTable: React.FC<StudentTableProps> = ({ students, searchTerm, addStudent, deleteStudent, teams }) => {
  const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.includes(searchTerm) ||
      (student.teamName && student.teamName.toLowerCase().includes(searchTerm.toLowerCase())) // Check if teamName is present
  );

  const [newStudent, setNewStudent] = React.useState({
    name: '',
    studentId: '',
    teamName: '', // Keep teamName in state but it's optional
    averageGrade: 0,
  });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.studentId) {
      addStudent(newStudent);
      setNewStudent({ name: '', studentId: '', teamName: '', averageGrade: 0 }); // Reset input fields
    }
  };

  const handleTeamChange = (studentId: number, newTeamName: string) => {
    // Handle updating the team name of the student
    const updatedStudents = students.map(student =>
        student.id === studentId ? { ...student, teamName: newTeamName } : student
    );
    // Assuming you have a function to update students in parent
    // updateStudents(updatedStudents);
  };

  return (
      <div className="p-4 bg-white">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold">Student Management</h2>
          <button
              onClick={handleAddStudent}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Add Student
          </button>
        </div>

        <div className="mb-4">
          <input
              type="text"
              placeholder="Student Name"
              value={newStudent.name}
              onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
              className="p-2 border border-gray-300 rounded bg-gray-200 text-black"
          />
          <input
              type="text"
              placeholder="Student ID"
              value={newStudent.studentId}
              onChange={e => setNewStudent({ ...newStudent, studentId: e.target.value })}
              className="p-2 border border-gray-300 rounded bg-gray-200 text-black ml-2"
          />
          <input
              type="number"
              placeholder="Average Grade"
              value={newStudent.averageGrade}
              onChange={e => setNewStudent({ ...newStudent, averageGrade: Number(e.target.value) })}
              className="p-2 border border-gray-300 rounded bg-gray-200 text-black ml-2"
          />
        </div>

        <table className="min-w-full bg-gray-100 border">
          <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">No</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Student Name</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">ID</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Team Name</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Average Peer Grade</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Action</th>
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
                      value={student.teamName || ''} // Show current selected team or default to empty
                      onChange={(e) => handleTeamChange(student.id, e.target.value)} // Call the handler when value changes
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
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <StarRating rating={student.averageGrade} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                      onClick={() => deleteStudent(student.id)}
                      className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default StudentTable;