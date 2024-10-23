import React, { useState, useEffect } from 'react';
import { Student } from '@t/types';
import Button from '@c/input/Button';
import { fetchTeammates } from '@f/student';
import { students as sampleStudents } from '@t/SampleData'; 

function SelectTeammate() {
  const [students, setStudents] = useState<Student[]>(sampleStudents);

  useEffect(() => {
    const loadStudents = async () => {
      const fetchedStudents = await fetchTeammates();
      setStudents(fetchedStudents);
    };

    loadStudents();
  }, []);

  const handleAssessClick = (studentId: string) => {
    console.log('Assessing Student:', studentId);
    // Implement assessment functionality or navigation here
  };

  return (
    <div className="p-6 bg-gray-100 h-full">
      <h1 className="text-2xl font-bold mb-6">Assess Your Teammates</h1>
      {students.map(student => (
        <div key={student.id} className="mb-6 p-4 bg-white rounded shadow">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{student.name}</h2>
              <p className="text-sm text-gray-500">ID: {student.studentId}</p>
              {student.teamName && (
                <p className="text-sm text-gray-500">Team: {student.teamName}</p>
              )}
              <p className="text-sm text-gray-500">Average Grade: {student.averageGrade}</p>
            </div>
            <Button 
              text="Assess" 
              handleClick={() => handleAssessClick(student.studentId)} //
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SelectTeammate;
