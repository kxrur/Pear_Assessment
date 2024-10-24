import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  studentId: string;
  teamName: string;
  averageGrade: number;
}

export interface AllStudentsSlice {
  allStudents: Student[];
}

const initialState: AllStudentsSlice = {
  allStudents: [
    {
      id: 0,
      firstName: "",
      lastName: "",
      studentId: "",
      username: "",
      teamName: "",
      averageGrade: 0,
    }
  ]
};

// Thunk to fetch students data
export const fetchStudents = createAsyncThunk(
  'fetch-students/get',
  async (teamId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/students`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Fetching students failed');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error || 'Network Error');
    }
  }
);

// All Students Slice
const allStudentsSlice = createSlice({
  name: 'allStudents',
  initialState,
  reducers: {
    resetAllStudents: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.allStudents = [];

      action.payload.forEach((student: Student) => {
        state.allStudents.push({
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          username: student.username,
          studentId: student.studentId,
          teamName: student.teamName,
          averageGrade: student.averageGrade,
        });
      });
    });
  },
});


export default allStudentsSlice.reducer;
export const { resetAllStudents } = allStudentsSlice.actions;
