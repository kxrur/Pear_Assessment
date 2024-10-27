import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@s/store";
import { TeamSlice } from "@s/teamSlice";
import { Team as otherTeam } from "@t/types"

export interface AllTeamsSlice {
  allTeams: TeamSlice[]
}
interface Student {
  id: number;
  firstName: string;
  lastName: string;
  studentId: string;
  teamName: string;
  averageGrade: number;
}

interface Team {
  id: number | null;
  teacherId: number | null
  students: Student[];
  teamName: string;
}

const initialState: AllTeamsSlice = {
  allTeams: [
    {
      teamName: "",
      teamDescription: "",
      teacherId: null,
      id: null,
      students: [
        {
          id: 0,
          name: "",
          studentId: "",
          teamName: "",
          averageGrade: 0,
        }
      ]
    }
  ]
}




export const fetchTeams = createAsyncThunk(
  'fetch-teams/get',
  async (dbStudentId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/teams/${dbStudentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Assessment submission failed');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error || 'Network Error');
    }
  }
);

export const createTeam = createAsyncThunk(
  'create-team/post',
  async ({ team, dbStudentId }: { team: otherTeam, dbStudentId: number }, { dispatch, rejectWithValue }) => {
    try {

      // Make a POST request to the correct API endpoint
      const response = await fetch('http://localhost:8080/api/teams/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          professorId: team.professorId,
          teamName: team.teamName,
          studentIds: team.teamMembers
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to create team");
      }

      console.log("Team created successfully:", team.teamName);

      dispatch(fetchTeams(dbStudentId));
    } catch (error) {
      console.error("Error occurred while creating team:", error);
      return rejectWithValue(error || "An error occurred");
    }

  }
);
export const deleteTeam = createAsyncThunk(
  'delete-team/post',
  async ({ teamId, dbStudentId }: { teamId: number, dbStudentId: number }, { dispatch, rejectWithValue }) => {
    try {

      // Make a POST request to the correct API endpoint
      const response = await fetch(`http://localhost:8080/api/teams/delete/${teamId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to create team");
      }

      console.log("Team deleted successfully:", response.json());

      dispatch(fetchTeams(dbStudentId));
    } catch (error) {
      console.error("Error occurred while creating team:", error);
      return rejectWithValue(error || "An error occurred");
    }

  }
);

const allTeamsSlice = createSlice({
  name: 'allTeams',
  initialState,
  reducers: {
    resetAllTeams: (state) => {
      Object.assign(state, initialState)
    },

  },
  extraReducers(builder) {
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      if (state.allTeams.length !== action.payload.length) {
        console.log("update teams")
        state.allTeams = [];

        action.payload.forEach((team: Team) => {
          state.allTeams.push({
            //TODO: adjust to use response data
            teamDescription: "some description",
            teamName: team.teamName,
            id: team.id,
            teacherId: team.teacherId,
            students: team.students.map((student: Student) => ({
              id: student.id,
              name: `${student.firstName} ${student.lastName}`,
              studentId: student.studentId,
              averageGrade: 0,
            }))
          });
        });
      }
    });
  },
});

export const selectTeamById = (state: RootState, teamId: number | null) =>
  state.allTeams.allTeams.find((team) => team.id === teamId);


export default allTeamsSlice.reducer;
export const { resetAllTeams } = allTeamsSlice.actions;
