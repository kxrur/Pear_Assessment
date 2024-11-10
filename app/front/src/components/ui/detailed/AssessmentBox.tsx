export type AssessmentBoxProps = {
  conceptual: string;
  cooperation: string;
  work: string;
  practical: string;
  avg: string;
};

export default function AssessmentBox({ conceptual, cooperation, work, practical, avg }: AssessmentBoxProps) {
  return (
    <div className="p-6 rounded-lg grid grid-cols-3 grid-rows-3 gap-4 items-center justify-items-center">
      <div className="bg-secondary text-white p-2 rounded-md col-start-1 row-start-1">
        {`Cooperation: ${cooperation}`}
      </div>

      <div className="bg-secondary text-white p-2 rounded-md col-start-3 row-start-1">
        {`Conceptual: ${conceptual}`}
      </div>

      <div className="bg-secondary text-white p-2 rounded-md col-start-1 row-start-3">
        {`Practical: ${practical}`}
      </div>

      <div className="bg-secondary text-white p-2 rounded-md col-start-3 row-start-3">
        {`Work Ethic: ${work}`}
      </div>

      <div className="bg-background text-white p-2 rounded-md col-start-2 row-start-2">
        {`Avg: ${avg}`}
      </div>
    </div>
  );
}
