import React from 'react';
import AssessItem, { AssessItemProps } from '@c/ui/assessment/AssessItem';
import UserProfile from '@c/ui/assessment/UserProfile';
import TeamName from '@c/ui/assessment/TeamName';
import { useAppDispatch, useAppSelector } from '@s/store';
import { assessStudent } from '@s/assessSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PrintButton from '@c/input/printpagebutton'; // Ensure the correct import path

const assessItemsData: AssessItemProps[] = [
  {
    name: "Cooperation",
    description: "Actively participating in meetings; Communicating within the group; Cooperating within the group; Assisting teammates when needed; Volunteering for tasks.",
    type: 'cooperation'
  },
  {
    name: "Conceptual Contribution",
    description: "Researching and gathering information; Quality of individual contribution; Suggesting ideas; Tying ideas together; Identifying difficulties; Identifying effective approaches.",
    type: 'conceptual'
  },
  {
    name: "Practical Contribution",
    description: "Writing of the report(s); Reviewing others' report(s) or section(s); Providing constructive feedback on the report(s) or the presentation; Contributing to the organization of the work; Contributing to the preparation of presentation(s) (if appropriate).",
    type: 'practical'
  },
  {
    name: "Work Ethic",
    description: "Displaying a positive attitude; Respecting team-mates; Respecting commitments; Respecting deadlines; Respecting team-mates' ideas.",
    type: 'workEthic'
  }
];

export default function AssessmentView() {
  const teamName = useAppSelector((state) => state.team.teamName);
  const firstName = useAppSelector((state) => state.assess.assesseeFirstName);
  const lastName = useAppSelector((state) => state.assess.assesseeLastName);
  const assessmentData = useAppSelector((state) => state.assess.assessmentData);
  const graderId = useAppSelector((state) => state.user.id);
  const dbAssesseeId = useAppSelector((state) => state.assess.dbAssesseeId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Initialize useNavigate



  function submitAssessment() {
    const assessmentDetails = { formData: assessmentData, graderId, dbAssesseeId };

    dispatch(assessStudent(assessmentDetails))
      .unwrap()
      .then(() => {
        console.log('Assessment submitted successfully! Navigating to confirmation...');
        navigate('/confirmation', { state: { assessmentDetails } }); // Pass assessment data
      })
      .catch((error) => {
        console.error('Failed to submit assessment:', error);
      });
  }
  function handleCancel() {
    navigate('/student-page'); // Navigate to TableStudent
  }

  return (
    <div className="p-8 bg-accent rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-start space-x-8">
        {/* User/Team Profile */}
        <div className="flex flex-col h-full last:mt-auto">
          <UserProfile firstName={firstName} lastName={lastName} />
          <TeamName teamName={teamName} />
          <button
            onClick={submitAssessment}
            className="mt-4 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Submit
          </button>
          <button
            onClick={handleCancel}
            className="mt-4 ml-4 px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <PrintButton
            className="mt-4 ml-4"
            onBeforePrint={() => console.log('Preparing to print...')}
          />
        </div>

        {/* Assessment Items */}
        <div className="flex flex-col flex-grow">
          <div className="mt-4 p-4 bg-white rounded-3xl">
            <div className="grid grid-cols-1 gap-4">
              {assessItemsData.map((item) => (
                <AssessItem key={item.name} name={item.name} description={item.description} type={item.type} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
