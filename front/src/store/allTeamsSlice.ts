import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";
import { TeamSlice } from "@s/teamSlice";

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
//TODO: create team thunk
//TODO: delete team thunk


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
    });
  },
});

export const selectTeamById = (state: RootState, teamId: number | null) =>
  state.allTeams.allTeams.find((team) => team.id === teamId);


export default allTeamsSlice.reducer;
export const { resetAllTeams } = allTeamsSlice.actions;
