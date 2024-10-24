import AssessItem from '@c/ui/assessment/AssessItem';
import UserProfile from '@c/ui/assessment/UserProfile';
import TeamName from '@c/ui/assessment/TeamName';
import { NavigateButton } from '@c/input/NavigateButton';
import { useAppSelector } from '@s/store';

const assessItemsData = [
  {
    name: "Cooperation",
    description: "Actively participating in meetings; Communicating within the group; Cooperating within the group; Assisting teammates when needed; Volunteering for tasks."
  },
  {
    name: "Conceptual Contribution",
    description: "Researching and gathering information; Quality of individual contribution; Suggesting ideas; Tying ideas together; Identifying difficulties; Identifying effective approaches."
  },
  {
    name: "Practical Contribution",
    description: "Writing of the report(s); Reviewing others' report(s) or section(s); Providing constructive feedback on the report(s) or the presentation; Contributing to the organization of the work; Contributing to the preparation of presentation(s) (if appropriate)."
  },
  {
    name: "Work Ethic",
    description: "Displaying a positive attitude; Respecting team-mates; Respecting commitments; Respecting deadlines; Respecting team-mates' ideas."
  }
];


export default function AssessmentView() {
  const teamName = "Awesome Team"
  const firstName = useAppSelector((state) => state.assess.assesseeFirstName);
  const lastName = useAppSelector((state) => state.assess.assesseeLastName);

  return (
    <div className="p-8 bg-accent rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-start space-x-8">
        {/* User/Team Profile */}
        <div className="flex flex-col h-full last:mt-auto ">
          <UserProfile firstName={firstName} lastName={lastName} />
          <TeamName teamName={teamName} />
          <NavigateButton text={'Submit'} path={''}></NavigateButton>
        </div>

        {/* Assessment Items */}
        <div className="flex flex-col flex-grow ">
          <div className="mt-4 p-4 bg-white rounded-3xl">
            <div className="grid grid-cols-1 gap-4">
              {assessItemsData.map((item) => (
                <AssessItem key={item.name} name={item.name} description={item.description} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
