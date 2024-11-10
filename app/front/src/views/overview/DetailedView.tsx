import TeamName from '@c/ui/assessment/TeamName';
import Profile from '@c/ui/assessment/UserProfile';
import StudentAssessmentList from '@c/ui/detailed/AllAssessmentsBox';

export default function DetailedView() {
  const fname = 'fname'
  const lname = 'lname'
  const teamName = 'team name'
  return (
    <div className="flex gap-8 p-8 bg-accent">
      <div className="w-1/4">
        <Profile firstName={fname} lastName={lname} />
        <TeamName teamName={teamName}></TeamName>
      </div>
      <div className="w-2/4">
        <StudentAssessmentList />
      </div>
    </div>
  );
}

