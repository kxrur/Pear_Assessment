import { useState } from 'react';
import AssessmentBox, { AssessmentBoxProps } from '@c/ui/detailed/AssessmentBox';
import UserProfile, { UserProfileProps } from '@c/ui/assessment/UserProfile';

export interface ToggleAssessmentProps {
  assessmentGrades: AssessmentBoxProps;
  assessmentComments: AssessmentBoxProps;
  evaluatorProfile: UserProfileProps;
}

export default function ToggleAssessment({
  assessmentGrades,
  assessmentComments,
  evaluatorProfile,
}: ToggleAssessmentProps) {
  const [view, setView] = useState<'grade' | 'comment' | 'profile'>('grade');

  const toggleView = () => {
    setView((prevView) => {
      if (prevView === 'grade') return 'comment';
      if (prevView === 'comment') return 'profile';
      return 'grade';
    });
  };

  return (
    <div className="flex flex-col gap-2 bg-white p-4 rounded-lg">
      <button
        onClick={toggleView}
        className="bg-highlight text-white px-4 py-2 rounded-lg"
      >
        Toggle View
      </button>

      {view === 'grade' && <AssessmentBox {...assessmentGrades} />}
      {view === 'comment' && <AssessmentBox {...assessmentComments} />}
      {view === 'profile' && (
        <div className="w-1/3">
          <UserProfile {...evaluatorProfile} />
        </div>
      )}
    </div>
  );
}
