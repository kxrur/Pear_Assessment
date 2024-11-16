import { getGambleOverview, GambleOverviewSlice } from '@s/gambleOverviewSlice';
import { useAppDispatch, useAppSelector } from '@s/store';
import { Summary } from '@s/teacherOverviewSlice'; // Import the Summary type
import { useEffect } from 'react';

interface GradePageProps {
  summary: Summary;
  teamId: number;
}

function GradePage({ summary, teamId }: GradePageProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user)

  const { cooperationR, conceptualR, practicalR, workEthic, average } = summary;

  const gamble = useAppSelector(state => state.gamble)
  const gambleGrade = useAppSelector(state => state.gambleOverview.gambledScore)
  useEffect(() => {
    if (user.id) {
      dispatch(getGambleOverview({ teamId: teamId, studentId: user.id }))
      console.log("update gamb over")
    }
  }, [dispatch, teamId, user.id, gamble]);


  console.log(summary, gambleGrade)

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
          <div className="bg-red-50 rounded-md p-3 w-full max-w-xs text-left">
            Gambled grade: {gambleGrade}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradePage;
