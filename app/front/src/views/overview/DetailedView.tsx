import { useEffect, useState } from 'react';
import TeamName from '@c/ui/assessment/TeamName';
import Profile from '@c/ui/assessment/UserProfile';
import StudentAssessmentList from '@c/ui/detailed/AllAssessmentsBox';
import { ToggleAssessmentProps } from '@c/ui/detailed/ToggleAssessment';
import { useAppDispatch, useAppSelector } from '@s/store';
import { fetchTeacherDetailedStudentOverview } from '@s/teacherOverviewSlice';

export interface DetailedViewProps {
  teamId: number;
}

export default function DetailedView({ teamId }: DetailedViewProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTeacherDetailedStudentOverview(8));
  }, [dispatch]);

  const detailed = useAppSelector(state => state.teacherOverview.detailed);

  const teammates: { fname: string; lname: string; assessments: ToggleAssessmentProps[] }[] = [
    {
      fname: 'Alice',
      lname: 'Smith',
      assessments: [
        {
          assessmentGrades: {
            conceptual: "Grade 1",
            cooperation: "Grade 2",
            work: "Grade 3",
            practical: "Grade 4",
            avg: "Grade Avg",
          },
          assessmentComments: {
            conceptual: "Comment on Conceptual",
            cooperation: "Comment on Cooperation",
            work: "Comment on Work Ethic",
            practical: "Comment on Practical",
            avg: "Grade Avg",
          },
          evaluatorProfile: {
            firstName: 'Alice',
            lastName: 'Smith',
          },
        },
      ],
    },
    {
      fname: 'Bob',
      lname: 'Jones',
      assessments: [
        {
          assessmentGrades: {
            conceptual: "Grade 1",
            cooperation: "Grade 3",
            work: "Grade 4",
            practical: "Grade 2",
            avg: "Grade Avg",
          },
          assessmentComments: {
            conceptual: "Good understanding",
            cooperation: "Works well in teams",
            work: "Consistent and reliable",
            practical: "Strong practical skills",
            avg: "Grade Avg",
          },
          evaluatorProfile: {
            firstName: 'Bob',
            lastName: 'Jones',
          },
        },
      ],
    },
  ];

  const [currentTeammateIndex, setCurrentTeammateIndex] = useState(0);
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
              className={`block w-full text-left px-2 py-2 rounded-lg focus:bg-secondary`}
            >
              <Profile firstName={teammate.fname} lastName={teammate.lname} />
            </button>
          ))}
        </div>
        <TeamName teamName="team name" />
      </div>
      <div className="w-2/4">
        <StudentAssessmentList assessments={currentTeammate.assessments} />
      </div>
    </div>
  );
}
