import ToggleAssessment, { ToggleAssessmentProps } from '@c/ui/detailed/ToggleAssessment';

export interface StudentAssessListProps {
  assessments: ToggleAssessmentProps[]
}

export default function StudentAssessmentList({ assessments }: StudentAssessListProps) {

  return (
    <div className="flex flex-col gap-4">
      {assessments.map((assessment, index) => (
        <ToggleAssessment key={index} {...assessment} />
      ))}
    </div>
  );
}

