import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@s/store";
import { fetchTeams } from "@s/allTeamsSlice";
import GradePage from "./GradePage";
import GamblePage from "./GamblePage";
import SideBarStudent from '@c/navBar/SideBarStudent.tsx';
import { sidebarItemsStudents } from '@t/SampleData.ts';
import { fetchTeacherStudentsOverview, getSummaryByStudentIdAndTeam, Summary } from "@s/teacherOverviewSlice";

const MyProfile: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const teams = useAppSelector((state) => state.allTeams.allTeams);
  const studentSummaries = useAppSelector((state) => state.teacherOverview.summary); // Assuming you have this selector


  const [selectedTeam, setSelectedTeam] = useState('');
  const [summary, setSummary] = useState<Summary | undefined>(undefined);

  // Dispatch fetch teams action
  useEffect(() => {
    if (user.id) {
      dispatch(fetchTeams(user.id));
      dispatch(fetchTeacherStudentsOverview(user.id));
    }
  }, [dispatch, user.id]);

  useEffect(() => {
    if (user.id && selectedTeam) {
      const newSummary = getSummaryByStudentIdAndTeam(studentSummaries, +(user.studentId || ""), selectedTeam);
      console.log('new summary: ', newSummary)
      setSummary(newSummary);
    }
  }, [selectedTeam, user.id, studentSummaries]); // Re-run when selectedTeam or user.id changes

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
  };
  //const summary = getSummaryByStudentIdAndTeam(studentSummaries, user.id || 0, selectedTeam)


  return (
    <div className="flex">
      <SideBarStudent items={sidebarItemsStudents} />
      <div className="flex-1 p-8 bg-[#FAF9F6]">
        <div className="text-center text-2xl font-semibold my-4">MY PROFILE</div>

        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-gray-200 w-20 h-20 flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>

          <div className="text-lg">{user.firstName + ' ' + user.lastName}</div>

          <div className="w-full max-w-sm space-y-2">
            <div className="bg-red-50 rounded-md p-3 text-left flex items-center space-x-4">
              <span>My team:</span>
              <select
                value={selectedTeam}
                onChange={handleTeamChange}
                className="bg-white border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="" disabled>Select your team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.teamName || 0}>
                    {team.teamName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pass the student summary to GradePage */}
          {studentSummaries ? (
            <GradePage summary={summary || studentSummaries[0]} />
          ) : (
            <div>Loading grade summary...</div>
          )}

          <GamblePage />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
