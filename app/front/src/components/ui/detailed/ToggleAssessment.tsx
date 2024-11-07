import { useState } from 'react';
import AssessmentBox from './AssessmentBox';
import UserProfile from '@c/ui/assessment/UserProfile';

export default function ToggleAssessment() {
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
        className="bg-highlight text-white px-4 py-2 rounded-lg">
        Toggle View
      </button>

      {view === 'grade' && (
        <AssessmentBox
          conceptual="Grade 1"
          cooperation="Grade 2"
          work="Grade 3"
          practical="Grade 4"
          avg="Grade Avg" />
      )}
      {view === 'comment' && (
        <AssessmentBox
          conceptual="Comment on Conceptual"
          cooperation="Comment on Cooperation"
          work="Comment on Work Ethic"
          practical="Comment on Practical"
          avg="Grade Avg" />
      )}
      {view === 'profile' && (
        <div className="w-1/3">
          <UserProfile firstName={'fname'} lastName={'lname'} />
        </div>
      )}
    </div>
  );
}

