import { updateAssessment } from "@s/assessSlice";
import { AssessmentData } from "@t/types";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface StarRatingProps {
  initialRating: number;
  editable?: boolean;
  type?: keyof AssessmentData;
}

function StarRating({ initialRating, editable = false, type }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);

  const dispatch = useDispatch();

  const handleRating = (newRating: number) => {
    if (editable && type) {
      dispatch(updateAssessment({ [type]: { stars: newRating } }));
      setRating(newRating);
    }
  };

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          onClick={() => handleRating(i + 1)} // Update rating when a star is clicked
          className={`h-5 w-5 ${editable ? 'cursor-pointer' : ''
            } ${i < rating ? 'text-yellow-400' : 'text-gray-400'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.036 3.173a1 1 0 00.95.69h3.341c.969 0 1.371 1.24.588 1.81l-2.705 1.964a1 1 0 00-.364 1.118l1.036 3.173c.3.921-.755 1.688-1.538 1.118l-2.705-1.964a1 1 0 00-1.176 0l-2.705 1.964c-.783.57-1.838-.197-1.538-1.118l1.036-3.173a1 1 0 00-.364-1.118L2.585 8.6c-.783-.57-.38-1.81.588-1.81h3.341a1 1 0 00.95-.69l1.036-3.173z" />
        </svg>
      ))}
    </div>
  );
}

export default StarRating;
