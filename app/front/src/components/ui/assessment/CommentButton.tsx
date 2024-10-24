import { updateAssessment } from "@s/assessSlice";
import { AssessmentData } from "@t/types";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface CommentButtonProps {
  type: keyof AssessmentData;
}

export default function CommentButton({ type }: CommentButtonProps) {
  const [isInputVisible, setInputVisible] = useState(false);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    setInputVisible(!isInputVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAssessment({ [type]: { comment: e.target.value } }));
    setComment(e.target.value);
  };

  return (
    <div className="flex items-center">
      <button
        className="ml-2 bg-transparent border-none"
        onClick={handleButtonClick}
      >
        <svg
          className="h-6 w-6 text-black"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 2H6a2 2 0 00-2 2v14l4-4h10a2 2 0 002-2V4a2 2 0 00-2-2zm-2 9H8v2h8v-2zm0-4H8v2h8V7z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isInputVisible && (
        <input
          type="text"
          value={comment}
          onChange={handleInputChange}
          placeholder="Add a comment"
          className="ml-4 p-2 border border-gray-300 rounded"
        />
      )}
    </div>
  );
}
