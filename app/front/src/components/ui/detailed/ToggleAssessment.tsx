import { useState } from 'react';
import AssessmentBox, { AssessmentBoxProps } from '@c/ui/detailed/AssessmentBox';
import UserProfile, { UserProfileProps } from '@c/ui/assessment/UserProfile';

export default function ToggleAssessment() {
  const [view, setView] = useState<'grade' | 'comment' | 'profile'>('grade');

  const toggleView = () => {
    setView((prevView) => {
      if (prevView === 'grade') return 'comment';
      if (prevView === 'comment') return 'profile';
      return 'grade';
    });
  };

  const assessmentGrades: AssessmentBoxProps =
  {
    conceptual: "Grade 1",
    cooperation: "Grade 2",
    work: "Grade 3",
    practical: "Grade 4",
    avg: "Grade Avg"
  }
  const assessmentComments: AssessmentBoxProps =
  {
    conceptual: "Comment on Conceptual",
    cooperation: "Comment on Cooperation",
    work: "Comment on Work Ethic",
    practical: "Comment on Practical",
    avg: "Grade Avg",
  }
  const evaluatorProfile: UserProfileProps = {
    firstName: "fname",
    lastName: "lname"
  }

  return (
    <div className="flex flex-col gap-2 bg-white p-4 rounded-lg">
      <button
        onClick={toggleView}
        className="bg-highlight text-white px-4 py-2 rounded-lg">
        Toggle View
      </button>

      {view === 'grade' && (
        <AssessmentBox {...assessmentGrades} />
      )}
      {view === 'comment' && (
        <AssessmentBox {...assessmentComments} />
      )}
      {view === 'profile' && (
        <div className="w-1/3">
          <UserProfile {...evaluatorProfile} />
        </div>
      )}
    </div>
  );
}

