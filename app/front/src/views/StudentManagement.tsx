import React, { useState } from 'react';
import Sidebar from '@c/navBar/Sidebar';
import Header from '@c/ui/table/Header';
import StudentTable from '@c/ui/table/StudentTable';
import ButtonOpenFile from '@c/input/ButtonOpenFile';
import { Student } from '@s/allStudentsSlice';

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Mohamed Tremblay', studentId: '40292922', teamName: 'Think Vision', averageGrade: 4 },
    // Add more initial students if needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // const addStudent = (newStudent: Student) => {
  //   const newStudentEntry = {
  //     id: students.length + 1, // Simple ID increment, consider using a unique ID generator
  //     name: newStudent.firstName + newStudent.lastName,
  //     studentId: newStudent.studentId,
  //     teamName: newStudent.teamName ?? 'No Team', // Provide default if undefined
  //     averageGrade: newStudent.averageGrade,
  //   };
  //   setStudents([...students, newStudentEntry]);
  // };
  //
  // // Function to delete a student based on ID
  // const deleteStudent = (id: number) => {
  //   setStudents(students.filter(student => student.id !== id));
  // };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <div className="p-4">
          <StudentTable
            searchTerm={searchTerm}
          // addStudent={addStudent} // Pass the addStudent function correctly
          // deleteStudent={deleteStudent} // Pass the delete function
          />
          <div className="mt-4">
            <ButtonOpenFile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
