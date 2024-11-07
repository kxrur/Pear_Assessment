import React, { useState } from 'react';
import { SummaryView } from '@t/types'; // Adjust the path as needed
import { summaryData } from '@t/SampleData.ts'; // Adjust the path accordingly
import Sidebar from '@c/navBar/Sidebar';
import CommentModal from '@c/ui/team/PopUpComment';

export default function Summary() {

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState<string | null>(null);

  const openModal = (comment: string | null) => {
    if (comment) {
      setCurrentComment(comment);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentComment(null);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow p-2 bg-white overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Student Summary View</h2>

        <table className="min-w-full bg-gray-100 border border-gray-100">
          <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">No</th>
            <th className="px-4 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">First
              Name
            </th>
            <th className="px-6 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Last
              Name
            </th>
            <th className="px-6 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">ID</th>
            <th className="px-6 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Team
              Name
            </th>
            <th className="px-2 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Average
              Peer Grade
            </th>
            <th className="px-3 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Cooperation</th>
            <th className="px-3 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Conceptual</th>
            <th className="px-3 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Practical</th>
            <th className="px-3 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Work
              Ethic
            </th>
            <th className="px-3 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Peers answered
            </th>
          </tr>
          </thead>
          <tbody>
          {summaryData.map((student, index) => (
              <tr key={student.studentId}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.studentId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.teamName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.averageGrade}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.cooperation.stars}

                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.conceptual.stars}

                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.practical.stars}

                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.workEthic.stars}

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <CommentModal isOpen={isModalOpen} onClose={closeModal} comment={currentComment} />
      </div>
    </div>
  );
}

