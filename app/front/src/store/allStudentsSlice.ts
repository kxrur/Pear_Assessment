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


export const fetchCSVStudents = createAsyncThunk(
  'fetch-csv-students/get',
  async (file: File, { rejectWithValue }) => {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);  // 'file' should match the backend @RequestParam("file")

    try {
      // Send the file to the backend
      const response = await fetch('http://localhost:8080/api/upload/students', {
        method: 'POST',
        body: formData,  // Send FormData object
      });

      if (response.ok) {
        //const data = await response.json();
        //console.log(data)
        toast.success(await response.text());
        //return data;
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
  },
});


export default allStudentsSlice.reducer;
export const { resetAllStudents } = allStudentsSlice.actions;
