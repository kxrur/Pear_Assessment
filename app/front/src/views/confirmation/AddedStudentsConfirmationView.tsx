import React, { useState } from 'react';
import Header from '@c/ui/table/Header';
import StudentTable from '@c/ui/table/AddedStudentsTable';

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Mohamed Tremblay', studentId: '40292922', teamName: 'Think Vision', averageGrade: 4 },
    // Add more initial students if needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <div className="p-4">
          <StudentTable
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
