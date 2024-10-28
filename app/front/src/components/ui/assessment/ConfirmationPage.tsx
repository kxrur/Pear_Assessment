import React from 'react';
import StarRating from "@c/ui/table/StarRating";

interface AssessmentItem {
  name: string;
  description: string;
  type: string;
  initialRating: number; // Initial rating for the StarRating component
}

// Hardcoded assessment items data with sample grades
const assessmentItemsData: AssessmentItem[] = [
  {
    name: "Cooperation",
    description: "Actively participating in meetings; Communicating within the group; Cooperating within the group; Assisting teammates when needed; Volunteering for tasks.",
    type: "cooperation",
    initialRating: 4 // Sample initial rating
  },
  {
    name: "Conceptual Contribution",
    description: "Researching and gathering information; Quality of individual contribution; Suggesting ideas; Tying ideas together; Identifying difficulties; Identifying effective approaches.",
    type: "conceptual",
    initialRating: 5 // Sample initial rating
  },
  {
    name: "Practical Contribution",
    description: "Writing of the report(s); Reviewing others' report(s) or section(s); Providing constructive feedback on the report(s) or the presentation; Contributing to the organization of the work; Contributing to the preparation of presentation(s) (if appropriate).",
    type: "practical",
    initialRating: 4 // Sample initial rating
  },
  {
    name: "Work Ethic",
    description: "Displaying a positive attitude; Respecting team-mates; Respecting commitments; Respecting deadlines; Respecting team-mates' ideas.",
    type: "workEthic",
    initialRating: 5 // Sample initial rating
  }
];

// Function to calculate average grade based on initial ratings
const calculateAverageRating = (items: AssessmentItem[]): number => {
  const total = items.reduce((sum, item) => sum + item.initialRating, 0);
  return total / items.length;
};

const ConfirmationPage: React.FC = () => {
  const averageRating = calculateAverageRating(assessmentItemsData);

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = () => {
    alert('Assessment submitted!'); // Placeholder for submission logic
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Assessment Details</h1>
      <p className="mt-4">Here are the details of the assessment:</p>

      <div className="mt-8 min-w-full bg-white border border-gray-300 rounded-lg">
        <div className="border-b">
          <h2 className="font-bold text-xl">Assessment Items</h2>
        </div>
        <div className="divide-y">
          {assessmentItemsData.map((item, index) => (
            <div key={index} className="p-4 flex flex-col">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-sm">{item.description}</p>

              <div className="flex items-center justify-between mt-4">
                <div className="bg-highlight p-2 rounded-lg">
                  <StarRating initialRating={item.initialRating} editable={false} />
                </div>


              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Average Rating: {averageRating.toFixed(2)} stars</h2>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="mr-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
        <button
          onClick={handlePrint}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Print Assessment Details
        </button>
      </div>

      <a href="/student-management" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Go Back to Student Management
      </a>
    </div>
  );
};

export default ConfirmationPage;
