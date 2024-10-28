import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  studentId: string;
  teamName: string;
  averageGrade: number;
}
export interface TempStudent {
  id: number;
  firstName: string;
  lastName: string;
  studentId: string;
}

export interface AllStudentsSlice {
  allStudents: Student[];
  allAddedStudents: TempStudent[]
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
  ],
  allAddedStudents: [
    {
      id: 0,
      firstName: "",
      lastName: "",
      studentId: "",
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
//TODO: implement add/delete student
export const addStudent = createAsyncThunk(
  'add-student/get',
  async (student: Student, { rejectWithValue }) => {
  }
);
export const deleteStudent = createAsyncThunk(
  'remove-student/get',
  async (student: Student, { rejectWithValue }) => {
  }
);

export const fetchCSVStudents = createAsyncThunk(
  'fetch-csv-students/get',
  async (file: File, { dispatch, rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/api/upload/students', {
        method: 'POST',
        body: formData,  // Send FormData object
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        toast.success("Upload successful");
        dispatch(fetchStudents(1));
        return data;
      } else {
        toast.error('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file.');
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
      if (state.allStudents.length !== action.payload.length) {

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
      }
    });
    builder.addCase(fetchCSVStudents.fulfilled, (state, action) => {
      state.allStudents = [];
      state.allAddedStudents = action.payload.map((student: TempStudent) => ({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        studentId: student.studentId,
      }));
    });
  },
});


export default allStudentsSlice.reducer;
export const { resetAllStudents } = allStudentsSlice.actions;
