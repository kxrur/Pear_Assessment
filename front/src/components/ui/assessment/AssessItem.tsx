import StarRating from "@c/ui/table/StarRating";
import CommentButton from "@c/ui/assessment/CommentButton";

interface AssessItemProps {
  name: string;
  description: string;
}

export default function AssessItem({ name, description }: AssessItemProps) {
  return (
    <div className="flex flex-col p-4 bg-secondary rounded-lg shadow-md mb-4">
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-background">{name}</h3>
        <p className="text-sm ">{description}</p>
      </div>

      {/* Star Rating Section - now below the text */}
      <div className="flex items-center justify-between mt-4">
        <div className="bg-highlight p-2 rounded-lg">
          <StarRating initialRating={0} editable={true} />
        </div>

        {/* Comment Button aligned to the right */}
        <CommentButton />
      </div>
    </div>
  );
}
