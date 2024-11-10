import { useEffect, useState } from 'react';
import TeamName from '@c/ui/assessment/TeamName';
import Profile from '@c/ui/assessment/UserProfile';
import StudentAssessmentList from '@c/ui/detailed/AllAssessmentsBox';
import { useAppDispatch, useAppSelector } from '@s/store';
import { fetchTeacherDetailedStudentOverview } from '@s/teacherOverviewSlice';

export interface DetailedViewProps {
  teamId: number;
}

export default function DetailedView({ teamId }: DetailedViewProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTeacherDetailedStudentOverview(teamId));
  }, [dispatch, teamId]);

  const detailed = useAppSelector(state => state.teacherOverview.detailed);

  const [currentTeammateIndex, setCurrentTeammateIndex] = useState(0);

  // Transform the API response data
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

  console.log("teammates", { ...teammates })
  const currentTeammate = teammates[currentTeammateIndex];

  const handleSelectTeammate = (index: number) => {
    setCurrentTeammateIndex(index);
  };

  return (
    <div className="flex gap-8 p-8 bg-accent">
      <div className="w-1/4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Team Members</h2>
          {teammates.map((teammate, index) => (
            <button
              key={index}
              onClick={() => handleSelectTeammate(index)}
              className="block w-full text-left px-2 py-2 rounded-lg focus:bg-secondary"
            >
              <Profile firstName={teammate.fname} lastName={teammate.lname} />
            </button>
          ))}
        </div>
        {teammates.length > 0 && <TeamName teamName={detailed[0].teamName} />}
      </div>
      <div className="w-2/4">
        {currentTeammate && currentTeammate.assessments.length > 0 ? (
          <StudentAssessmentList assessments={currentTeammate.assessments} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-6xl">No Feedback Yet ☹️</p>
          </div>
        )}
      </div>
    </div>
  );
}
