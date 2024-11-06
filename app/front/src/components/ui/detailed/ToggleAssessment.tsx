import { useState } from 'react';
import AssessmentBox from './AssessmentBox';

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
          avg="Average Comment" />
      )}
      {view === 'profile' && (
        <div className="bg-accent p-4 rounded-lg flex items-center gap-2">
          <div className="w-12 h-12 bg-foreground rounded-full"></div> {/* Placeholder for profile icon */}
          <div className="text-secondary">Assessor Name</div>
        </div>
      )}
    </div>
  );
}

