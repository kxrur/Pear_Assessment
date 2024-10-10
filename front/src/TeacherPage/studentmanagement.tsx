import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StudentTable from '../components/StudentTable';
import ButtonOpenFile from '../components/input/buttonOpenFile';

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Mohamed Tremblay', studentId: '40292922', teamName: 'Think Vision', averageGrade: 4 },
    // Add more initial students if needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const addStudent = (newStudent: { name: string; studentId: string; teamName?: string; averageGrade: number }) => {
    const newStudentEntry = {
      id: students.length + 1, // Simple ID increment, consider using a unique ID generator
      ...newStudent,
    };
    const addStudent = (newStudent: { name: string; studentId: string; teamName?: string; averageGrade: number }) => {
      const newStudentEntry = {
        id: students.length + 1,
        name: newStudent.name,
        studentId: newStudent.studentId,
        teamName: newStudent.teamName || '', // Provide a default value for teamName
        averageGrade: newStudent.averageGrade,
      };
      setStudents([...students, newStudentEntry]);
    };
  };

  // Function to delete a student based on ID
  const deleteStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <div className="p-4">
          <StudentTable 
            students={students} 
            searchTerm={searchTerm} 
            addStudent={addStudent} // Pass the addStudent function correctly
            deleteStudent={deleteStudent} // Pass the delete function
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
// Compare this snippet from main/Monaco_SOEN341_Project_F24/front/src/components/TeamTable.tsx: