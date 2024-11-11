import { Summary } from '@s/teacherOverviewSlice'; // Import the Summary type

interface GradePageProps {
  summary: Summary;
}

function GradePage({ summary }: GradePageProps) {
  const { cooperationR, conceptualR, practicalR, workEthic, average } = summary;
  console.log(summary)

  return (
    <div className="flex">
      <div className="flex-1 p-8 bg-[#FAF9F6]">
        <div className="text-center text-2xl font-semibold my-4">MY GRADE:</div>
        <div className="flex flex-col items-center space-y-4">
          {/* Render grades dynamically */}
          <div className="bg-red-50 rounded-md p-3 w-full max-w-xs text-left">
            Cooperation: {cooperationR}
          </div>
          <div className="bg-red-50 rounded-md p-3 w-full max-w-xs text-left">
            Conceptual: {conceptualR}
          </div>
          <div className="bg-red-50 rounded-md p-3 w-full max-w-xs text-left">
            Practical: {practicalR}
          </div>
          <div className="bg-red-50 rounded-md p-3 w-full max-w-xs text-left">
            Work ethic: {workEthic}
          </div>
          <div className="bg-red-50 rounded-md p-3 w-full max-w-xs text-left">
            Total avg: {average}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradePage;
