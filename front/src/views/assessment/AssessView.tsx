import AssessItem from '@c/ui/assessment/AssessItem';
import UserProfile from '@c/ui/assessment/UserProfile';
import TeamName from '@c/ui/assessment/TeamName';

export default function AssessmentView() {
  return (
    <div className="p-8 bg-accent rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-start space-x-8">
        {/* User Profile */}
        <UserProfile firstName="Fname" lastName="Lname" />

        {/* Main Content */}
        <div className="flex-grow">
          {/* Team Name */}
          <TeamName teamName="Awesome Team" />

          {/* Assessment Items */}
          <div className="mt-4 p-4 space-y-4 bg-white rounded-3xl ">
            <AssessItem
              name="Cooperation"
              description="Actively participating in meetings; Communicating within the group; Cooperating within the group; Assisting teammates when needed; Volunteering for tasks."
              stars={[true, true, true, false, false]}
            />
            <AssessItem
              name="Conceptual Contribution"
              description="Researching and gathering information; Quality of individual contribution; Suggesting ideas; Tying ideas together; Identifying difficulties; Identifying effective approaches."
              stars={[true, true, false, false, false]}
            />
            <AssessItem
              name="Practical Contribution"
              description="Writing of the report(s); Reviewing others' report(s) or section(s); Providing constructive feedback on the report(s) or the presentation; Contributing to the organization of the work; Contributing to the preparation of presentation(s) (if appropriate)."
              stars={[true, true, true, false, false]}
            />
            <AssessItem
              name="Work Ethic"
              description="Displaying a positive attitude; Respecting team-mates; Respecting commitments; Respecting deadlines; Respecting team-mates' ideas."
              stars={[true, true, true, true, false]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
