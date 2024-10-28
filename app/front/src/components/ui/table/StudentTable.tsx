import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StarRating from './StarRating';
import { RootState, useAppDispatch } from '@s/store';
import { addStudent, deleteStudent, fetchStudents, Student } from '@s/allStudentsSlice';
import { Team } from '@t/types.ts';
import Dropdown from '@c/input/Dropdown.tsx';

interface StudentTableProps {
  searchTerm: string;
}

export default function StudentTable({ searchTerm }: StudentTableProps) {
  const dispatch = useAppDispatch();
  const allStudents = useSelector((state: RootState) => state.allStudents);

  useEffect(() => {
    dispatch(fetchStudents(1))
  }, [allStudents.allStudents]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  useEffect(() => {
    // Filter students dynamically based on search term
    setFilteredStudents(
      allStudents.allStudents.filter(student =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toString().includes(searchTerm) ||
        (student.teamName && student.teamName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, allStudents]);

  const [newStudent, setNewStudent] = React.useState<Student>({
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    studentId: '',
    teamName: '',
    averageGrade: 0,
  });


  const handleAddStudent = () => {
    if (newStudent.firstName && newStudent.studentId) {
      dispatch(addStudent(newStudent))
      setNewStudent({ firstName: '', lastName: '', studentId: '', teamName: '', averageGrade: 0, id: 0, username: '' });
    }
  };

  // const handleTeamChange = (studentId: number, newTeamName: string) => {
  //   const updatedStudents = studentTeams.map(student =>
  //     student.id === studentId ? { ...student, teamName: newTeamName } : student
  //   );
  //   setStudentTeams(updatedStudents); // Update local state
  // };

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
          placeholder="First Name"
          value={newStudent.firstName}
          onChange={e => setNewStudent({ ...newStudent, firstName: e.target.value })}
          className="p-2 border border-gray-300 rounded bg-gray-200 text-black" />
        <input
          type="text"
          placeholder="Last Name"
          value={newStudent.lastName}
          onChange={e => setNewStudent({ ...newStudent, lastName: e.target.value })}
          className="p-2 border border-gray-300 rounded bg-gray-200 text-black ml-2" />
        <input
          type="text"
          placeholder="Student ID"
          value={newStudent.studentId}
          onChange={e => setNewStudent({ ...newStudent, studentId: e.target.value })}
          className="p-2 border border-gray-300 rounded bg-gray-200 text-black ml-2" />
        <input
          type="number"
          placeholder="Average Grade"
          value={newStudent.averageGrade}
          onChange={e => setNewStudent({ ...newStudent, averageGrade: Number(e.target.value) })}
          className="p-2 border border-gray-300 rounded bg-gray-200 text-black ml-2" />
      </div>

      <table className="min-w-full bg-gray-100 border">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">No</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">First Name</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Last Name</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">ID</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Team Name</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Average Peer Grade</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.studentId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Dropdown dbStudentId={student.id} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <StarRating initialRating={student.averageGrade} editable={false} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => dispatch(deleteStudent(student))} // Dispatch delete action
                  className="text-red-600 hover:text-background">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
