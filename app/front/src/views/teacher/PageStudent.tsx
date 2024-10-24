// PageStudent.tsx
import React, { useState } from 'react';
import Sidebar from '@c/navBar/Sidebar';
import Header from '@c/ui/table/Header';
import TableStudent from '@c/ui/table/TableStudent'; // Import TableStudent component
import { teams } from '@t/SampleData'; // Import teams data instead of type
import { Team } from '@t/types';

const PageStudent: React.FC = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Mohamed Tremblay', studentId: '40292922', averageGrade: 4 },
    // Add more initial students if needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <div className="p-4">
          <TableStudent
            students={students}
            teams={teams} // Pass the teams array correctly
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
};

export default PageStudent;
