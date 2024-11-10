import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@s/store';
import { fetchTeacherStudentsOverview } from '@s/teacherOverviewSlice';
import SideBarStudent from '@c/navBar/SideBarStudent.tsx';
import { sidebarItemsStudents } from '@t/SampleData.ts';

export default function Summary() {
  const dispatch = useAppDispatch();
  const teacherId = useAppSelector(state => state.user.id);
  const summaryData = useAppSelector(state => state.teacherOverview.summary);

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchTeacherStudentsOverview(teacherId));
    }
  }, [dispatch, teacherId]);


  return (
    <div className="flex h-screen">
      <SideBarStudent items={sidebarItemsStudents} />
      <div className="flex-grow p-2 bg-white overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Student Summary View</h2>

        <table className="min-w-full bg-gray-100 border border-gray-100">
          <thead>
            <tr>
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
            {summaryData.map((studentSummary, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{studentSummary.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{studentSummary.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{studentSummary.studentId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{studentSummary.teamName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{studentSummary.average}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {studentSummary.cooperationR}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {studentSummary.conceptualR}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {studentSummary.practicalR}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {studentSummary.workEthic}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {studentSummary.nbResponses}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
