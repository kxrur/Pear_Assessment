import { useEffect, useState } from 'react';
import TeamName from '@c/ui/assessment/TeamName';
import Profile from '@c/ui/assessment/UserProfile';
import StudentAssessmentList from '@c/ui/detailed/AllAssessmentsBox';
import { useAppDispatch, useAppSelector } from '@s/store';
import { fetchTeacherDetailedStudentOverview } from '@s/teacherOverviewSlice';
import { fetchTeams } from '@s/allTeamsSlice';

export default function DetailedView() {
  const dispatch = useAppDispatch();
  const teacherId = useAppSelector(state => state.user.id);
  const allTeams = useAppSelector(state => state.allTeams.allTeams);

  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [currentTeammateIndex, setCurrentTeammateIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchTeams(teacherId || 0));
  }, [dispatch, teacherId]);

  useEffect(() => {
    if (selectedTeamId) {
      dispatch(fetchTeacherDetailedStudentOverview(selectedTeamId));
    }
  }, [dispatch, selectedTeamId]);

  const detailed = useAppSelector(state => state.teacherOverview.detailed);

  const teammates = detailed.map((student) => ({
    fname: student.studentName.split(' ')[0] || '',
    lname: student.studentName.split(' ')[1] || '',
    assessments: student.studentRatings.map((rating) => ({
      assessmentGrades: {
        conceptual: `${rating.conceptualRating}`,
        cooperation: `${rating.cooperationRating}`,
        work: `${rating.workEthicRating}`,
        practical: `${rating.practicalRating}`,
        avg: `${rating.averageRating}`,
      },
      assessmentComments: {
        conceptual: rating.conceptualComment || 'No comment',
        cooperation: rating.cooperationComment || 'No comment',
        work: rating.workEthicComment || 'No comment',
        practical: rating.practicalComment || 'No comment',
        avg: `${rating.averageRating}`,
      },
      evaluatorProfile: {
        firstName: rating.teammateName.split(' ')[0] || '',
        lastName: rating.teammateName.split(' ')[1] || '',
      },
    })),
  }));

  const currentTeammate = teammates[currentTeammateIndex];

  const handleSelectTeammate = (index: number) => {
    setCurrentTeammateIndex(index);
  };

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeamId(Number(event.target.value));
    setCurrentTeammateIndex(0);
  };

  return (
    <div className="flex gap-8 p-8 bg-accent">
      <div className="w-1/4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Select Team</h2>
          <select
            onChange={handleTeamChange}
            className="w-full px-3 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white text-gray-700 shadow-sm"
          >
            <option value="">Select a Team</option>
            {allTeams.map((team) => (
              <option key={team.id} value={team.id || ''}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Team Members</h2>
          {teammates.map((teammate, index) => (
            <button
              key={index}
              onClick={() => handleSelectTeammate(index)}
              className="block w-full text-left px-2 py-2 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 focus:bg-secondary transition duration-150 shadow-sm"
            >
              <Profile firstName={teammate.fname} lastName={teammate.lname} />
            </button>
          ))}
        </div>
        {teammates.length > 0 && <TeamName teamName={detailed[0]?.teamName} />}
      </div>
      <div className="w-2/4">
        {currentTeammate && currentTeammate.assessments.length > 0 ? (
          <StudentAssessmentList assessments={currentTeammate.assessments} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-6xl text-gray-500">No Feedback Yet ☹️</p>
          </div>
        )}
      </div>
    </div>
  );
}
