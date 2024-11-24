import React, { useState } from 'react';
import Sidebar from '@c/navBar/Sidebar';
import Header from '@c/ui/table/Header';
import StudentTable from '@c/ui/table/StudentTable';
import ButtonOpenFile from '@c/input/ButtonOpenFile';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '@s/store';

const StudentManagement: React.FC = () => {
const studentId = useAppSelector(state => state.user.studentId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/check/updated/${studentId} `);
        console.log(studentId)
        if (response.status > 199 && response.status<300) {  // Accepted - there is an update
          toast.success("You have a new evaluation.");
        } else if (response.status === 400) {  // Bad Request - no new evaluations
          console.log("No new evaluations available.");
        } else {
          throw new Error('Unexpected response from the server.');
        }
      } catch (error) {
      }
    };
    fetchData();
  }, [studentId]);

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
