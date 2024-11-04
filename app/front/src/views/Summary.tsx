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
              <th className="px-4 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">First Name</th>
              <th className="px-6 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Last Name</th>
              <th className="px-6 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-6 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Team Name</th>
              <th className="px-2 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Average Peer Grade</th>
              <th className="px-3 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Cooperation</th>
              <th className="px-3 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Conceptual</th>
              <th className="px-3 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Practical</th>
              <th className="px-3 py-2 border-b border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600">Work Ethic</th>
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
                  {student.cooperation.comment && (
                    <svg
                      onClick={() => openModal(student.cooperation.comment)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5 text-blue-500 cursor-pointer inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.conceptual.stars}
                  {student.conceptual.comment && (
                    <svg
                      onClick={() => openModal(student.conceptual.comment)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5 text-blue-500 cursor-pointer inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.practical.stars}
                  {student.practical.comment && (
                    <svg
                      onClick={() => openModal(student.practical.comment)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5 text-blue-500 cursor-pointer inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.workEthic.stars}
                  {student.workEthic.comment && (
                    <svg
                      onClick={() => openModal(student.workEthic.comment)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5 text-blue-500 cursor-pointer inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
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

