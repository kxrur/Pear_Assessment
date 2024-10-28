import { useEffect, useState } from 'react';
import { RootState, useAppSelector } from '@s/store';
import { TempStudent } from '@s/allStudentsSlice';
interface TableStudentProps {
  searchTerm: string;
}

export default function TableStudent({ searchTerm }: TableStudentProps) {
  const allStudents = useAppSelector((state: RootState) => state.allStudents.allAddedStudents);


  const [filteredStudents, setFilteredStudents] = useState<TempStudent[]>([]);
  useEffect(() => {
    setFilteredStudents(
      allStudents.filter(student => student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toString().includes(searchTerm)
      )
    );
  }, [searchTerm, allStudents]);


  return (
    <div className="p-4 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Added Students from CSV</h2>

      <table className="min-w-full bg-gray-100 border">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">ID</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Student Name</th>
            <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Student ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.firstName + student.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.studentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

