import React, { useState } from 'react';
import Sidebar from '@c/navBar/Sidebar.tsx';
import Header from '@c/ui/table/Header.tsx';
import StudentTable from '@c/ui/table/StudentTable.tsx';
import ButtonOpenFile from '@c/input/ButtonOpenFile.tsx';
import { sidebarItems, teams } from '@t/SampleData.ts';

interface Student {
  id: number;
  name: string;
  studentId: string;
  teamName?: string;
  averageGrade?: number;
}

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Mohamed Tremblay', studentId: '40292922', teamName: 'Think Vision', averageGrade: 4 },
    // Add more initial students if needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const addStudent = (newStudent: { name: string; studentId: string; teamName?: string; }) => {
    const newStudentEntry: Student = {
      id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
      ...newStudent,
    };
    setStudents([...students, newStudentEntry]);
  };

  const deleteStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
      <div className="flex">
        <Sidebar items={sidebarItems} />
        <div className="flex-1">
          <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <div className="p-4">
            <StudentTable
                students={students}
                searchTerm={searchTerm}
                addStudent={addStudent}
                deleteStudent={deleteStudent}
                teams={teams} // Pass teams directly
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