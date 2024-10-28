import React from 'react';
import StarRating from "@c/ui/table/StarRating";
import { AssessmentData } from '@t/types';
import { useAppSelector } from '@s/store';
import { useNavigate } from 'react-router-dom';
import { NavigateButton } from '@c/input/NavigateButton';




export default function ConfirmationPage() {
  const assessmentData = useAppSelector((state) => state.assess)
  const assessmentItemsData = useAppSelector((state) => state.assess.assessmentData)
  const user = useAppSelector((state) => state.user)

  console.log(assessmentData)

  const calculateAverageRating = (): number => {
    const ratings = Object.values(assessmentItemsData).map((item) => item.stars || 0);
    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    return ratings.length ? total / ratings.length : 0;
  };
  const handlePrint = () => {
    window.print();
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Assessment for {assessmentData.assesseeFirstName} {assessmentData.assesseeLastName}</h1>
      <h1 className="text-2xl font-bold">Assessment by {user.firstName} {user.lastName}</h1>
      <p className="mt-4">Here are the details of the assessment:</p>

      <div className="mt-8 min-w-full bg-white border border-gray-300 rounded-lg">
        <div className="border-b">
          <h2 className="font-bold text-xl">Assessment Items</h2>
        </div>
        <div className="divide-y">
          {Object.entries(assessmentItemsData).map(([type, item], index) => (
            <div key={index} className="p-4 flex flex-col">
              <h3 className="font-bold text-lg">{type}</h3>
              <p className="text-sm">{item.comment}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="bg-highlight p-2 rounded-lg">
                  <StarRating initialRating={item.stars || 0} editable={false} />
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
        <button onClick={handlePrint} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Print Assessment Details
        </button>
      </div>
      <NavigateButton text={'Go Back to Teammate Selection'} path={'/select-teammate'}></NavigateButton>
      <NavigateButton text={'Go Back to Student Management'} path={'/student-management'}></NavigateButton>


    </div>
  );
}
