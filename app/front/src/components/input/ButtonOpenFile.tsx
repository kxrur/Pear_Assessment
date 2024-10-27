import React from 'react';
import Papa from 'papaparse';
import { Student } from '@t/types.ts';



const ButtonOpenFile: React.FC<ButtonOpenFileProps> = ({ addStudentsFromCSV }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const students = result.data.map((row: any, index: number) => ({
         
            name: row.name,
            studentId: row.studentId,
            teamName: '', // Initialize teamName as empty or any default value
          })) as Student[];

          addStudentsFromCSV(students);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="p-2 border border-gray-300 rounded bg-gray-200 text-black mb-4"
      />
    </div>
  );
};

export default ButtonOpenFile;