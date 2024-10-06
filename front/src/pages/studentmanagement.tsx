import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StudentTable from '../components/StudentTable';

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Mohamed Tremblay', studentId: '40292922', teamName: 'Think Vision', averageGrade: 4 },
    // Add more initial students if needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const addStudent = (newStudent: { name: string; studentId: string; teamName: string; averageGrade: number }) => {
    const newStudentEntry = {
      id: students.length + 1, // Simple ID increment; consider more robust logic for production
      ...newStudent,
    };
    setStudents([...students, newStudentEntry]);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <StudentTable students={students} searchTerm={searchTerm} addStudent={addStudent} />
      </div>
    </div>
  );
};

export default StudentManagement;
