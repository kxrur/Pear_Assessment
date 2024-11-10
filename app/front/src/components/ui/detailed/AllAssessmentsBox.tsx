import React from 'react';
import ToggleAssessment from '@c/ui/detailed/ToggleAssessment';

const StudentAssessmentList: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(5)].map((_, index) => (
        <ToggleAssessment key={index} />
      ))}
    </div>
  );
};

export default StudentAssessmentList;
