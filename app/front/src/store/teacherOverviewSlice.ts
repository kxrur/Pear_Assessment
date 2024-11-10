
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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

interface StudentRating {
  teammateName: string
  cooperationRating: number
  conceptualRating: number
  practicalRating: number
  workEthicRating: number
  cooperationComment: string
  conceptualComment: string
  practicalComment: string
  workEthicComment: string
  averageRating: number
}

export interface Detailed {
  teamName: string,
  studentName: string,
  studentRatings: StudentRating[]
}

interface TeacherStudentsView {
  summary: Summary[],
  detailed: Detailed[]
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
  ],
  detailed: [{
    teamName: "",
    studentName: "",
    studentRatings: [
      {
        teammateName: "",
        cooperationRating: 0,
        conceptualRating: 0,
        practicalRating: 0,
        workEthicRating: 0,
        cooperationComment: "",
        conceptualComment: "",
        practicalComment: "",
        workEthicComment: "",
        averageRating: 0
      }
    ]
  }]
}


export const fetchTeacherDetailedStudentOverview = createAsyncThunk<Detailed[], number>(
  'teacher_detailed_overview/fetch',
  async (teamId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/teams/detailed-view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamId: teamId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || 'fetchTeacherDetailedStudentOverview failed');
      }

      console.log("data: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error || 'Network Error');
    }
  }
);

export const fetchTeacherStudentsOverview = createAsyncThunk<Summary[], number>(
  'teacher_summary_overview/fetch',
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
        throw new Error(data || 'fetchTeacherStudentsOverview failed');
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
    builder.addCase(fetchTeacherDetailedStudentOverview.fulfilled, (state, action: PayloadAction<Detailed[]>) => {
      state.detailed = action.payload;
    });
    builder.addCase(fetchTeacherDetailedStudentOverview.rejected, (_, action) => {
      console.error('fetchTeacherDetailedStudentOverview failed:', action.payload);
    });
  },
});

export default teacherOverviewSlice.reducer;
export const { resetTeacherOverview } = teacherOverviewSlice.actions;
