
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './userSlice';
import { teams } from '@t/SampleData';

export interface Summary {
  studentId: number,
  lastName: string,
  firstName: string,
  teamName: string,
  cooperationR: string,
  conceptualR: string,
  practicalR: string,
  workEthic: string,
  average: string,
  nbResponses: number
}

interface TeacherStudentsView {
  summary: Summary[],
}
const initialState: TeacherStudentsView = {
  summary: [
    {
      studentId: 0,
      lastName: "",
      firstName: "",
      teamName: "",
      cooperationR: "",
      conceptualR: "",
      practicalR: "",
      workEthic: "",
      average: "",
      nbResponses: 0
    },
  ]
}

export const fetchTeacherStudentsOverview = createAsyncThunk<Summary[], number>(
  'teacher_overview/fetch',
  async (teacherId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/teams/summary-view/${teacherId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || 'Assessment submission failed');
      }

      console.log("data: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error || 'Network Error');
    }
  }
);

const teacherOverviewSlice = createSlice({
  name: 'teacherOverview',
  initialState,
  reducers: {
    resetTeacherOverview: (state) => {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeacherStudentsOverview.fulfilled, (state, action: PayloadAction<Summary[]>) => {
      state.summary = action.payload;
    });
    builder.addCase(fetchTeacherStudentsOverview.rejected, (_, action) => {
      console.error('fetchTeacherStudentsOverview failed:', action.payload);
    });
  },
});

export default teacherOverviewSlice.reducer;
export const { resetTeacherOverview } = teacherOverviewSlice.actions;
