import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface StudentInfo {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  roles: string[];
  studentId: number;
  temp: boolean;
}

interface TeamInfo {
  id: number;
  professorID: number;
  students: StudentInfo[];
  teamName: string;
}

export interface GambleOverviewSlice {
  student: StudentInfo;
  team: TeamInfo;
  gambledScore: number;
  averageScore: number;
  approvalStatus: 'APPROVED' | 'PENDING' | 'REJECTED' | '';
  loading: boolean;
  error: string;
}

// Initial state with default values assigned
const initialState: GambleOverviewSlice = {
  student: {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    roles: [],
    studentId: 0,
    temp: false,
  },
  team: {
    id: 0,
    professorID: 0,
    students: [],
    teamName: '',
  },
  gambledScore: 0,
  averageScore: 0,
  approvalStatus: 'PENDING',
  loading: false,
  error: '',
};

export const getGambleOverview = createAsyncThunk<GambleOverviewSlice, { teamId: number; studentId: number }>(
  'gamble-overview/get',
  async ({ teamId, studentId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/gamble/overview/${teamId}/${studentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: GambleOverviewSlice = await response.json();

      if (!response.ok) {
        throw new Error(data ? JSON.stringify(data) : 'Assessment submission failed');
      }

      console.log("gamble overview", data)
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Network Error');
    }
  }
);

const gambleOverviewSlice = createSlice({
  name: 'gamble-overview',
  initialState,
  reducers: {
    resetGambleOverview: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGambleOverview.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getGambleOverview.fulfilled, (state, action: PayloadAction<GambleOverviewSlice>) => {
        state.student = action.payload.student;
        state.team = action.payload.team;
        state.gambledScore = action.payload.gambledScore;
        state.averageScore = action.payload.averageScore;
        state.approvalStatus = action.payload.approvalStatus;
        state.loading = false;
        state.error = '';
        console.log(state)
      })
      .addCase(getGambleOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default gambleOverviewSlice.reducer;
export const { resetGambleOverview: resetGamble } = gambleOverviewSlice.actions;
