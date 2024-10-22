import StarRating from "@c/ui/table/StarRating";
import CommentButton from "@c/ui/assessment/CommentButton";

interface AssessItemProps {
  name: string;
  description: string;
}

export default function AssessItem({ name, description }: AssessItemProps) {
  return (
    <div className="flex flex-col p-4 bg-[#D3B58D] rounded-lg shadow-md mb-4">
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-[#3C4D3F]">{name}</h3>
        <p className="text-sm text-[#3C4D3F]">{description}</p>
      </div>

      {/* Star Rating Section - now below the text */}
      <div className="flex items-center justify-between mt-4">
        <div className="bg-[#3C4D3F] p-2 rounded-lg">
          <StarRating rating={2} />
        </div>

        {/* Comment Button aligned to the right */}
        <CommentButton />
      </div>
    </div>
  );
}
